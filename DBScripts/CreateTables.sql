--Create Table Login
--(UserId varchar(100),Password  varchar(20),IsFirstLogin bit,Location nvarchar(50),
--CreatedOn datetime,ModifiedOn datetime);

--Create Table Expenses
--(ExpenseId int not null auto_increment primary key,Date date,Particulars varchar(50),
--Ref varchar(50),SiteName varchar(50),ApprovedBy varchar(50),
--Receipt varchar(50),Payment double,ClosingBalance double,
--Narration varchar(100));

--CREATE TABLE Machinery
--(
--MachineryId int not null auto_increment primary key,Date date,MachineryName nvarchar(50),
--PartyName  nvarchar(50),Particulars  nvarchar(50),SiteName nvarchar(50),
--Location nvarchar(50),Chinage nvarchar(50),StartingTime nvarchar(50),
--ClosingTime nvarchar(50),TotalWorkingHours  nvarchar(50),Remarks nvarchar(50)
--);

--CREATE TABLE MaterialsGroup1Received
--(
--RawMaterialId int not null auto_increment primary key,Date date,MachineryName nvarchar(50),UoM varchar(50),Qty int,
--Particulars  nvarchar(50),SiteName nvarchar(50),Location nvarchar(50),Chinage nvarchar(50),SupplierName nvarchar(50),GroupId int
--);

--CREATE TABLE MaterialsGroup2Received
--(
--DCNo int not null auto_increment primary key,Date date,Qty int,
--Particulars  nvarchar(50),SiteName nvarchar(50),Location nvarchar(50),Chinage nvarchar(50),
--SupplierName nvarchar(50),VehicleNo nvarchar(20),TransporterName nvarchar(50),GroupId int
--);

--CREATE TABLE DieselReceived
--(
--DieselReceivedId int not null auto_increment primary key,Date date,Qty int,
--Particulars  nvarchar(50),SiteName nvarchar(50),Chinage nvarchar(50),
--SupplierName nvarchar(50),Rate real,Amount real
--);

--CREATE TABLE MaterialsGroup1Consumed
--(
--MaterialsGroup1ConsumedId int not null auto_increment primary key,Date date,
--Particulars  nvarchar(50),SiteName nvarchar(50),Chinage nvarchar(50),Location nvarchar(50),
--ApprovedBy nvarchar(50),UoM nvarchar(50),Qty int,ClosingQty int,IssuedBy nvarchar(50),GroupId int
--);

--CREATE TABLE MaterialsGroup2Consumed
--(
--MaterialsGroup2ConsumedId int not null auto_increment primary key,Date date,
--Particulars  nvarchar(50),SiteName nvarchar(50),Chinage nvarchar(50),Location nvarchar(50),
--Qty int,ClosingQty int,IssuedBy nvarchar(50),GroupId int
--);

--CREATE TABLE DieselConsumed
--(
--DieselConsumedId int not null auto_increment primary key,Date date,
--Particulars  nvarchar(50),Machinery nvarchar(50),SiteName nvarchar(50),Chinage nvarchar(50),
--Qty int,ClosingQty int,FilledBy nvarchar(50)
--);

--CREATE TABLE MaterialGroup
--(
--GroupId  int not null auto_increment primary key,
--GroupName nvarchar(30)
--);

--Create Table MachineryNamesMaster
--(Id int not null auto_increment primary key,
--Name varchar(50),
--GroupId int);

--Create Table ParticularsMaster
--(Id int not null auto_increment primary key,
--ParticularsName varchar(50),
--GroupId int);

--Create Table UoMMaster
--(Id int not null auto_increment primary key,
--UoMName varchar(50),
--GroupId int);

--CREATE TABLE Locations
--(
--Id  int not null auto_increment primary key,
--LocationName nvarchar(30)
--);

--create table LocationMaster
--(Id int primary key auto_increment,
--LocationName varchar(30));


--CREATE TABLE RMCReceived
--(
--DCNo int not null auto_increment primary key,Date date,Qty int,UoM nvarchar(50),
--Particulars  nvarchar(50),SiteName nvarchar(50),Labour nvarchar(50),TruckNo nvarchar(20));

--CREATE TABLE RMCConsumed
--(
--RMCConsumedId int not null auto_increment primary key,Date date,
--Particulars  nvarchar(50),RMCPlant nvarchar(50),UoM varchar(30),Qty int,SiteName varchar(30));



--Create Table NMR
--(NMRId int not null auto_increment primary key,Date date,Particulars varchar(30),
--SiteName varchar(30),Location varchar(30),Chinage varchar(30),Male varchar(30),Female varchar(30),	
--Mason varchar(30),Description varchar(30))