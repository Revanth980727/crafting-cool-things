from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import os
from datetime import datetime

DB_PATH = os.getenv("SQLITE_DB_PATH", "sqlite:///sqlite/db.sqlite3")
engine = create_engine(DB_PATH, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class File(Base):
    __tablename__ = "files"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, unique=True, index=True)
    upload_time = Column(DateTime, default=datetime.utcnow)
    text_length = Column(Integer)
    path = Column(String)
    sessions = relationship("Session", back_populates="file")

class Session(Base):
    __tablename__ = "sessions"
    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    question = Column(Text)
    answer = Column(Text)
    page_ref = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    file = relationship("File", back_populates="sessions")

Base.metadata.create_all(bind=engine)

def add_file(filename, text_length, path):
    db = SessionLocal()
    file = File(filename=filename, text_length=text_length, path=path)
    db.add(file)
    db.commit()
    db.refresh(file)
    db.close()
    return file

def get_file(file_id):
    db = SessionLocal()
    file = db.query(File).filter(File.id == file_id).first()
    db.close()
    return file

def add_session(file_id, question, answer, page_ref=None):
    db = SessionLocal()
    session = Session(file_id=file_id, question=question, answer=answer, page_ref=page_ref)
    db.add(session)
    db.commit()
    db.close()

def get_sessions(file_id):
    db = SessionLocal()
    sessions = db.query(Session).filter(Session.file_id == file_id).order_by(Session.timestamp).all()
    db.close()
    return sessions 