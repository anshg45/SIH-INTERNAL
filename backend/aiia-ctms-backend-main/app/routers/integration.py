from datetime import date
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import AuditTrail, Patient, ResearchStudy, User
from app.routers.auth import get_current_user
from app.routers.studies import _enrollment_percent

router = APIRouter(prefix="/integration", tags=["integration"])


def _visible_studies(db: Session, user: User):
    query = db.query(ResearchStudy)
    if user.role == "pi":
        query = query.filter(ResearchStudy.principal_investigator_id == user.id)
    return query.order_by(ResearchStudy.created_at.desc()).all()


@router.get("/portfolio")
def portfolio(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    studies = _visible_studies(db, user)
    pending_ctri = sum(1 for study in studies if study.ctri_status != "registered")
    pending_iec = sum(1 for study in studies if study.iec_approval_status != "approved")
    enrollment_target = sum(study.enrollment_target for study in studies)
    enrolled = sum(study.enrolled_count for study in studies)
    audit_count = db.query(AuditTrail).count()

    alerts = []
    for study in studies:
        if study.ctri_status != "registered":
            alerts.append({"severity": "high", "type": "CTRI", "study_id": str(study.id), "message": f"CTRI registration pending for {study.title}"})
        if study.iec_approval_status != "approved":
            alerts.append({"severity": "high", "type": "IEC", "study_id": str(study.id), "message": f"Ethics approval pending for {study.title}"})
        if study.end_date and study.end_date < date.today():
            alerts.append({"severity": "medium", "type": "MILESTONE", "study_id": str(study.id), "message": f"Study end date passed for {study.title}"})

    return {
        "role": user.role,
        "generated_at": date.today().isoformat(),
        "studies": [{
            "id": str(study.id), "title": study.title, "status": study.status,
            "ctri_status": study.ctri_status, "iec_approval_status": study.iec_approval_status,
            "enrollment_percent": _enrollment_percent(study),
        } for study in studies],
        "kpis": {
            "active_studies": sum(1 for study in studies if study.status not in {"closed", "terminated"}),
            "enrollment_percent": round(100 * enrolled / enrollment_target, 1) if enrollment_target else 0,
            "ctri_pending": pending_ctri,
            "iec_pending": pending_iec,
            "audit_events": audit_count,
        },
        "alerts": alerts,
    }


@router.get("/fhir/r4/{resource_type}/{resource_id}")
def fhir_resource(resource_type: str, resource_id: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if resource_type.lower() == "researchstudy":
        study = db.query(ResearchStudy).filter(ResearchStudy.id == resource_id).first()
        if not study or (user.role == "pi" and study.principal_investigator_id != user.id):
            raise HTTPException(status_code=404, detail="ResearchStudy not found")
        return {
            "resourceType": "ResearchStudy", "id": str(study.id),
            "status": study.status, "title": study.title,
            "phase": {"text": study.phase} if study.phase else None,
            "sponsor": {"display": study.sponsor} if study.sponsor else None,
            "extension": [
                {"url": "https://aiia.gov.in/fhir/ctri-status", "valueCode": study.ctri_status},
                {"url": "https://aiia.gov.in/fhir/iec-approval-status", "valueCode": study.iec_approval_status},
            ],
            "enrollment": {"count": study.enrolled_count},
            "period": {"start": study.start_date.isoformat() if study.start_date else None, "end": study.end_date.isoformat() if study.end_date else None},
        }
    if resource_type.lower() == "patient":
        patient = db.query(Patient).filter(Patient.id == resource_id).first()
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        study = db.query(ResearchStudy).filter(ResearchStudy.id == patient.study_id).first()
        if user.role == "pi" and (not study or study.principal_investigator_id != user.id):
            raise HTTPException(status_code=403, detail="Patient is outside your study scope")
        return {"resourceType": "Patient", "id": str(patient.id), "identifier": [{"value": patient.screening_number}], "gender": patient.sex, "birthDate": None}
    raise HTTPException(status_code=404, detail="FHIR resource type not supported")
