# app/routes/user.py
from fastapi import APIRouter, Depends, HTTPException,status,Request
from sqlalchemy.orm import Session
from server.controllers.auth import verify_password,verify_access_token,authenticate_request
from server.database.database import get_db
from server.database.schemas import User, UserCreate , EmployeeCreate , Employee,Token
from server.controllers import user_controller , employee_controlller
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.security import OAuth2PasswordBearer


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()


@router.post("/users/", response_model=Employee)
def create_user(user: EmployeeCreate, db: Session = Depends(get_db)):
    return user_controller.create_user(db=db, emp=user)




@router.get("/user/", response_model=User)
@authenticate_request
async def get_current_user(request: Request, db: Session = Depends(get_db)):
    user_email = request.state.user.get("sub")
    user = user_controller.get_user(db, email=user_email)
    return user


@router.post("/token", response_model=Token)
def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    print(f"Form data: {form_data}")
    db_user = user_controller.get_user(db, email=form_data.username)
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    if not verify_password(form_data.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user_controller.login(db_user)


@router.get("/getassignedtrucks")
@authenticate_request
async def get_assigned_trucks(request: Request):
    id=request.state.user.get("id")
    

    return {"hi":"hi"}