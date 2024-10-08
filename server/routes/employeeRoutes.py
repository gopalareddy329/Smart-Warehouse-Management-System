# app/routes/user.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from server.database.database import get_db
from server.database.schemas import  EmployeeCreate , Employee
from server.controllers import employee_controlller , employee_schedule_controller 
from server.database.models.truckModel import Dock

router = APIRouter()


@router.post("/employee/" , response_model=Employee)
def create_employee(emp:EmployeeCreate , db:Session=Depends(get_db)):
    return employee_controlller.create_employee(db=db , emp=emp)

@router.get("/employees/{employee_id}", response_model=Employee)
def read_user(employee_id: int, db: Session = Depends(get_db)):
    db_emp = employee_controlller.get_employee(db, id=employee_id)
    if db_emp is None:
        raise HTTPException(status_code=404, detail="Employee Inexistent")
    return db_emp 



async def truncate_employee(db:Session= Depends(get_db)):
    employee_controlller.delete_existing_employees(db) 
    return {'Success' : 'True'}

@router.get("/employees/assign_crew/{dock_id}")
def assign_crew(dock_id: int, team_size: int = 5, db: Session = Depends(get_db)):
    dock=db.query(Dock).filter(Dock.docks_id == dock_id).first()
    if len(dock.employees)>0:
        raise HTTPException(status_code=422, detail=str("Already assigned"))
    try:
        crew = employee_schedule_controller.assign_employee_team_on_request(db, dock_id, team_size)
        return {"crew": [{"id": emp.id,
                          "name": emp.name, 
                          "role": emp.employment_type.value ,
                          "heavy_machinery" : emp.heavy_machinery , 
                          "experience" : emp.experience } 
                    for emp in crew]}
    except HTTPException as e: 
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post('/employees/truncate_used_employee_set/')
def clear_used_employee_set(db:Session=Depends(get_db)):
    employee_schedule_controller.truncate_used_employee_set(db)
    return {'Success':True}