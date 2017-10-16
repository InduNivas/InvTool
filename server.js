// load the things we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var module = require("module")
module.exports = express();
app.use(bodyParser());
var http = require('http');
var mysql = require('mysql');
var mssql = require('mssql');
var router = express.Router();
var dateFormat = require('dateformat');
var now = new Date();

// Basic usage

//-------------

// set the view engine to ejs
app.set('view engine', 'ejs');

var con = mysql.createConnection({
    host: "localhost",
    port: "3307",
    user: "root",
    password: "password$1",
    database: 'Inventory_Dev'
});


// use res.render to load up an ejs view file
app.use(express.static(__dirname + '/Content'));
app.use(express.static(__dirname + '/Scripts'));
// index page 
app.get('/', function (req, res) {
    var data = [];
    con.query("Select * from login", function (err, rows, fields) {
        if (!!err)
            console.log("error");
        else {
            console.log("success");

            for (i = 0 ; i < rows.length ; i++) {

                data.push(rows[i].UserId);
                data.push(rows[i].Password);
                data.push(rows[i].IsFirstLogin);
                data.push(rows[i].CreatedOn);
                data.push(rows[i].ModifiedOn);
            }
            var UserInfo = { UserId: data[0], password: data[1], IsFirstLogin: data[2] };
            res.render('pages/login', {
                UserInfo: UserInfo
            });
        }
    });
});

// about page 
app.get('/about', function (req, res) {

    res.render('pages/about');
});
//Master Data Start
app.get('/services/machineryMasterByGroupId', function (req, res) {

    con.query("Select * from machinerynamesmaster where GroupId =" + req.query.groupId + " order by Id desc", function (err, rows, fields) {
        if (!!err)
            console.log("error");
        else {
            console.log("success");
            var data = [];
            for (i = 0 ; i < rows.length ; i++) {
                data.push(rows[i].Id);
                data.push(rows[i].Name);
            }
            res.send({ machinerymaster: rows });
        }
    });

});
app.get('/services/particularsMasterByGroupId', function (req, res) {

    con.query("Select * from particularsmaster where GroupId =" + req.query.groupId + " order by Id desc", function (err, rows, fields) {
        if (!!err)
            console.log("error");
        else {
            console.log("success");
            var data = [];
            for (i = 0 ; i < rows.length ; i++) {
                data.push(rows[i].Id);
                data.push(rows[i].ParticularsName);
            }
            res.send({ particularsMaster: rows });
        }
    });

});
app.get('/services/uomMasterByGroupId', function (req, res) {
    con.query("Select * from uommaster where GroupId =" + req.query.groupId + " order by Id desc", function (err, rows, fields) {
        if (!!err)
            console.log("error");
        else {
            console.log("success");
            //var data = [];
            //for (i = 0 ; i < rows.length ; i++) {
            //    data.push(rows[i].Id);
            //    data.push(rows[i].UoMName);
            //}
            res.send({ uomMaster: rows });
        }
    });
});
app.get('/services/locations', function (req, res) {
    var Locations = [{ Id: 1, LocationName: "Hyderabad" }, { Id: 2, LocationName: "Mumbai" }, { Id: 3, LocationName: "Chennai" }];
    con.query("Select * from Locations",
                 function (err, rows, fields) {
                     if (!!err)
                         console.log("error");
                     else {
                         console.log("success machinery read");

                         for (i = 0 ; i < rows.length ; i++) {
                             Locations.push(rows[i].Id);
                             Locations.push(rows[i].LocationName);
                         }
                     }
                     console.log("rows " + rows);
                 });
    console.log("LocationsName: " + Locations);

    res.send({ LocationNames: Locations });
});

//Master Data End
app.get('/expenses', function (req, res) {
    res.render('pages/expenses');
});
app.get("/machinery", function (req, res) {
    res.render('pages/Machinery');
});
app.get("/earthwork", function (req, res) {
    res.render('pages/earthWork');
});
app.get("/concrete", function (req, res) {
    console.log("Concrete");

    res.render('pages/concrete');
});
app.get("/sand", function (req, res) {
    res.render('pages/sand');
});
app.get("/gravel", function (req, res) {
     res.render('pages/gravel');
});
app.get("/metal", function (req, res) {
    res.render('pages/metal');
});

app.get("/diesel", function (req, res) {
    res.render('pages/diesel');
});
app.get("/cement", function (req, res) {
    //var UoM = [
    //    { Name: "Cum", ID: 1 },
    //{ Name: "Sqm", MachineryID: 2 }];
    //var particulars = [
    //    { ParticularID: 1, ParticularName: "Break Down" },
    //    { ParticularID: 2, ParticularName: "No Work" },
    //    { ParticularID: 3, ParticularName: "Due to Rain" },
    //    { ParticularID: 4, ParticularName: "Working" }
    //];


    res.render('pages/cement');
});
app.get("/steel", function (req, res) {
    //var UoM = [
    //    { Name: "Cum", ID: 1 },
    //{ Name: "Sqm", MachineryID: 2 }];
    //var particulars = [
    //    { ParticularID: 1, ParticularName: "Break Down" },
    //    { ParticularID: 2, ParticularName: "No Work" },
    //    { ParticularID: 3, ParticularName: "Due to Rain" },
    //    { ParticularID: 4, ParticularName: "Working" }
    //];


    res.render('pages/steel');
});

app.get("/RMC", function (req, res) {    
    res.render('pages/RMC');
});
app.get("/NMR", function (req, res) {
    res.render('pages/NMR');
});

app.get('/services/expenses', function (req, res) {

    con.query("Select * from Expenses order by ExpenseId desc", function (err, rows, fields) {
        if (!!err)
            console.log("error");
        else {
            console.log("success");
            var data = [];
            for (i = 0 ; i < rows.length ; i++) {

                data.push(rows[i].Date);
                data.push(rows[i].Particulars);
                data.push(rows[i].Ref);
                data.push(rows[i].SiteName);
                data.push(rows[i].ApprovedBy);
                data.push(rows[i].Receipt);
                data.push(rows[i].Payment);
                data.push(rows[i].ClosingBalance);
                data.push(rows[i].Narration);
            }
            res.send({ expensesInfo: rows });
        }
    });

});

app.post('/services/expenses/Update', function (req, res) {

    con.query("UPDATE EXPENSES SET Particulars=" + req.body.Particulars + ",Ref='" + req.body.Ref + "'," + "SiteName='" +
        req.body.SiteName + "'," + "ApprovedBy='" + req.body.ApprovedBy + "'," + "Receipt='" + req.body.Receipt + "'," +
        "Payment=" + req.body.Payment + "," + "ClosingBalance=" + req.body.ClosingBalance + "," + "Narration='" + req.body.Narration + "'"
        + ",Date ='" + dateFormat(req.body.Date, "yyyy-mm-dd") + "' WHERE ExpenseId=" + req.body.ExpenseId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("success");
                res.send({ expensesInfo: null });
            }
        });
    console.log("Updated Successfully");
});

app.post('/services/expenses/Create', function (req, res) {

    con.query("INSERT INTO EXPENSES (Date, Particulars,Ref,SiteName,ApprovedBy,Receipt,Payment,ClosingBalance,Narration) VALUES ('"
        + dateFormat(req.body.Date, "yyyy-mm-dd") + "','" + req.body.Particulars + "','" + req.body.Ref + "','" + req.body.SiteName + "','" + req.body.ApprovedBy + "','" + req.body.Receipt + "','" +
        req.body.Payment + "','" + req.body.ClosingBalance + "','" + req.body.Narration + "')",
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("Create");
                var data = [];
                //for (i = 0 ; i < rows.length ; i++) {

                //    data.push(rows[i].Date);
                //    data.push(rows[i].Particulars);
                //    data.push(rows[i].Ref);
                //    data.push(rows[i].SiteName);
                //    data.push(rows[i].ApprovedBy);

                //    data.push(rows[i].Receipt);
                //    data.push(rows[i].Payment);
                //    data.push(rows[i].ClosingBalance);
                //    data.push(rows[i].Narration);
                //}
                //console.log(rows);
                res.send({ expensesInfo: data });
            }
        });
    //res.send({ expensesInfo: Users });
});

app.post('/services/expenses/Delete', function (req, res) {
    con.query("DELETE FROM EXPENSES WHERE ExpenseId=" + req.body.ExpenseId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("success deleted");
            }
        });

    console.log("Deleted Successfully");
    res.send({ expensesInfo: null });
});

app.get('/services/machinery', function (req, res) {
    var dataMachinery = [];
    con.query("Select M.* from Machinery M where Location='Hyderabad'", //+ req.query.LocationId,
                 function (err, rows, fields) {
                     if (!!err)
                         console.log("error :" + err);
                     else {
                         console.log("success machinery read");
                         for (i = 0 ; i < rows.length ; i++) {
                             dataMachinery.push({
                                 "MachineryId": rows[i].MachineryId, "Date": rows[i].Date, "MachineryName": { "Name": rows[i].MachineryName },
                                 "PartyName": rows[i].PartyName, "Particulars": { "ParticularsName": rows[i].Particulars }, "SiteName": rows[i].SiteName,
                                 "Location": { "LocationName": rows[i].Location }, "Chinage": rows[i].Chinage, "StartingTime": rows[i].StartingTime, "ClosingTime": rows[i].ClosingTime,
                                 "TotalWorkingHours": rows[i].TotalWorkingHours, "Remarks": rows[i].Remarks
                             });
                         }
                     }
                     res.send({ AllMachineries: dataMachinery });
                 });
            });


app.post('/services/machinery/Update', function (req, res) {
    console.log("Actual date " + (req.body.StartingTime));
    var sqlQuery = "UPDATE Machinery SET Particulars='" + req.body.Particulars.ParticularsName + "',MachineryName='" + req.body.MachineryName.Name + "'," + "SiteName='" +
        req.body.SiteName + "'," + "PartyName='" + req.body.PartyName + "'," + "StartingTime='" + req.body.StartingTime + "'," +
        "ClosingTime='" + req.body.ClosingTime + "'," + "TotalWorkingHours='" + req.body.TotalWorkingHours + "'," + "Remarks='" + req.body.Remarks + "'," +
		"Location='" + req.body.Location.LocationName + "'," + "Chinage='" + req.body.Chinage + "',"
        + "Date ='" + dateFormat(req.body.Date, "yyyy-mm-dd") + "' WHERE MachineryId=" + req.body.MachineryId;
    console.log("query " + sqlQuery);
    con.query(sqlQuery,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("Update");
                res.send({ AllMachineries: null });
            }
        });

    console.log("Updated Successfully");

});

app.post('/services/machinery/Create', function (req, res) {
    con.query("INSERT INTO Machinery (Particulars,MachineryName,SiteName,PartyName,StartingTime,ClosingTime,TotalWorkingHours,Remarks,Location,Chinage,Date) VALUES ('"
    + req.body.Particulars.ParticularsName + "','" + req.body.MachineryName.Name + "','" + req.body.SiteName + "','" + req.body.PartyName + "','"
    + dateFormat(req.body.StartingTime, "hh:MM") + "','" + dateFormat(req.body.ClosingTime, "hh:MM") + "','" + req.body.TotalWorkingHours + "','" + req.body.Remarks
    + "','" + req.body.Location.LocationName + "','" + req.body.Chinage + "','" + dateFormat(req.body.Date, "yyyy-mm-dd") + "')",
    function (err, rows, fields) {
        if (!!err)
            console.log(err);
        else {
            console.log("Create");
            var data = [];
            res.send({ AllMachineries: data });
        }
    });
});

app.post('/services/machinery/Delete', function (req, res) {
    con.query("DELETE FROM Machinery WHERE MachineryId=" + req.body.MachineryId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("success deleted");
            }
        });

    console.log("Deleted Successfully");
    res.send({ AllMachineries: null });
});

app.get('/services/RawMaterialGroup1', function (req, res) {

    con.query("Select mgr.* from MaterialsGroup1Received mgr " +
				"join MaterialGroup mg on mg.GroupId= mgr.GroupId " +
				"where mgr.GroupId=" + req.query.groupId, function (err, rows, fields) {
				    if (!!err)
				        console.log("error " + err);
				    else {
				        console.log("success machinery read");

				        var data = [];
				        for (i = 0 ; i < rows.length ; i++) {
				            data.push({
				                "RawMaterialId": rows[i].RawMaterialId, "Date": rows[i].Date, "MachineryName": rows[i].MachineryName,
				                "UoM": { "UoMName": rows[i].UoM }, "Qty": rows[i].Qty, "Particulars": { "ParticularsName": rows[i].Particulars }, "SiteName": rows[i].SiteName,
				                "Location": { "LocationName": rows[i].Location }, "Chinage": rows[i].Chinage, "SupplierName": rows[i].SupplierName
				            });
				        }
				        res.send({ RawMaterials: data });
				    }
				});

});

app.post('/services/RawMaterialGroup1/Update', function (req, res) {
    con.query("UPDATE MaterialsGroup1Received SET Particulars='" + req.body.Particulars.ParticularsName + "',MachineryName='" + req.body.MachineryName + "'," + "SiteName='" +
        req.body.SiteName + "'," + "UoM='" + req.body.UoM.UoMName + "'," + "Qty=" + req.body.Qty + "," +
        "SupplierName=" + (req.body.SupplierName == undefined ? null : "'" + req.body.SupplierName + "'") + "," + "Location='" + req.body.Location.LocationName + "',"
        + "Chinage='" + req.body.Chinage + "',"
        + "Date ='" + dateFormat(req.body.Date, "yyyy-mm-dd") + "' WHERE RawMaterialId=" + req.body.RawMaterialId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("Update");
                res.send({ RawMaterials: null });
            }
        });

    console.log("Updated Successfully");

});

app.post('/services/RawMaterialGroup1/Create', function (req, res) {
    console.log("tes " + req.body.SupplierName);
    con.query("INSERT INTO MaterialsGroup1Received (Particulars,MachineryName,SiteName,UoM,Qty,SupplierName,Location,Chinage,Date,GroupId) VALUES ('"
    + req.body.Particulars.ParticularsName + "','" + req.body.MachineryName + "','" + req.body.SiteName + "','" + req.body.UoM.UoMName + "',"
    + req.body.Qty + "," + (req.body.SupplierName == undefined ? null : "'" + req.body.SupplierName + "'") + "," + (req.body.Location.LocationName == undefined ? null : "'" + req.body.Location.LocationName + "'") + ",'"
    + req.body.Chinage + "','" + dateFormat(req.body.Date, "yyyy-mm-dd") + "'," + req.body.GroupId + ")",
    function (err, rows, fields) {
        if (!!err)
            console.log(err);
        else {
            console.log("Create");
            var data = [];
            res.send({ RawMaterials: data });
        }
    });

});

app.post('/services/RawMaterialGroup1/Delete', function (req, res) {
    con.query("DELETE FROM MaterialsGroup1Received WHERE RawMaterialId=" + req.body.RawMaterialId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("success deleted");
            }
        });

    console.log("Deleted Successfully");
    res.send({ RawMaterials: null });
});

app.get('/services/dieselReceived', function (req, res) {

    con.query("Select * from DieselReceived order by DieselReceivedId desc", function (err, rows, fields) {
        if (!!err)
            console.log("error");
        else {
            console.log("success");
            var data = [];
            for (i = 0 ; i < rows.length ; i++) {

                data.push({
                    "DieselReceivedId": rows[i].DieselReceivedId, "Date": rows[i].Date, "SupplierName": rows[i].SupplierName,
                    "Qty": rows[i].Qty, "Particulars": { "ParticularsName": rows[i].Particulars },
                    "SiteName": rows[i].SiteName, "Rate": rows[i].Rate, "Chinage": rows[i].Chinage, "Amount": rows[i].Amount
                });

                //data.push(rows[i].Date);
                //data.push(rows[i].Particulars);
                //data.push(rows[i].SupplierName);
                //data.push(rows[i].SiteName);
                //data.push(rows[i].Chinage);
                //data.push(rows[i].Qty);
                //data.push(rows[i].Rate);
                //data.push(rows[i].Amount);
            }
            res.send({ dieselReceivedInfo: data });
        }
    });

});

app.post('/services/dieselReceived/Update', function (req, res) {

    con.query("UPDATE DIESELRECEIVED SET Particulars='" + req.body.Particulars.ParticularsName + "',Qty=" + req.body.Qty + "," + "SiteName='" +
        req.body.SiteName + "'," + "Chinage='" + req.body.Chinage + "'," + "SupplierName='" + req.body.SupplierName + "'," +
        "Rate=" + req.body.Rate + "," + "Amount=" + req.body.Amount + ",Date ='" + dateFormat(req.body.Date, "yyyy-mm-dd")
        + "' WHERE DieselReceivedId =" + req.body.DieselReceivedId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("Update");
                res.send({ dieselReceivedInfo: null });
            }
        });

    console.log("Updated Successfully");

});

app.post('/services/dieselReceived/Create', function (req, res) {

    con.query("INSERT INTO DIESELRECEIVED (Date, Particulars,Qty,SiteName,Chinage,SupplierName,Rate,Amount) VALUES ('"
        + dateFormat(req.body.Date, "yyyy-mm-dd") + "','" + req.body.Particulars.ParticularsName + "'," + req.body.Qty + ",'"
        + req.body.SiteName + "','" + req.body.Chinage + "','" + req.body.SupplierName + "'," +
        req.body.Rate + "," + req.body.Amount + ")",
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("Create");
                var data = [];

                res.send({ dieselReceivedInfo: data });
            }
        });

});

app.post('/services/dieselReceived/Delete', function (req, res) {
    con.query("DELETE FROM DIESELRECEIVED WHERE DieselReceivedId =" + req.body.DieselReceivedId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("success deleted");
            }
        });

    console.log("Deleted Successfully");
    res.send({ dieselReceivedInfo: null });
});

app.get('/services/dieselConsumed', function (req, res) {

    con.query("Select * from DieselConsumed order by DieselConsumedId desc", function (err, rows, fields) {
        if (!!err)
            console.log("error");
        else {
            console.log("success");
            var data = [];
            for (i = 0 ; i < rows.length ; i++) {

                data.push({
                    "DieselConsumedId": rows[i].DieselConsumedId, "Date": rows[i].Date, "Machinery": rows[i].Machinery,
                    "Qty":  rows[i].Qty, "Particulars": { "ParticularsName": rows[i].Particulars },
                    "SiteName": rows[i].SiteName, "ClosingQty": rows[i].ClosingQty , "Chinage": rows[i].Chinage, "FilledBy": rows[i].FilledBy
                });

                //data.push(rows[i].Date);
                //data.push(rows[i].Particulars);
                //data.push(rows[i].Machinery);
                //data.push(rows[i].Qty);
                //data.push(rows[i].SiteName);
                //data.push(rows[i].Chinage);
                //data.push(rows[i].FilledBy);
                //data.push(rows[i].ClosingQty);
            }
            res.send({ dieselConsumedInfo: data });
        }
    });

});

app.post('/services/dieselConsumed/Update', function (req, res) {

    con.query("UPDATE DIESELCONSUMED SET Particulars='" + req.body.Particulars.ParticularsName + "',Qty=" + req.body.Qty + "," + "SiteName='" +
        req.body.SiteName + "'," + "Chinage='" + req.body.Chinage + "'," + "Machinery='" + req.body.Machinery + "'," +
        "ClosingQty=" + req.body.ClosingQty + "," + "FilledBy='" + req.body.FilledBy
        + "',Date ='" + dateFormat(req.body.Date, "yyyy-mm-dd") + "' WHERE DieselConsumedId =" + req.body.DieselConsumedId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("Update");
                res.send({ dieselConsumedInfo: null });
            }
        });

    console.log("Updated Successfully");

});

app.post('/services/dieselConsumed/Create', function (req, res) {

    con.query("INSERT INTO DIESELCONSUMED (Date, Particulars,Qty,SiteName,Chinage,Machinery,ClosingQty,FilledBy) VALUES ('"
        + dateFormat(req.body.Date, "yyyy-mm-dd") + "','" + req.body.Particulars.ParticularsName + "'," + req.body.Qty + ",'" + req.body.SiteName
        + "','" + req.body.Chinage + "','" + req.body.Machinery + "'," + req.body.ClosingQty + ",'" + req.body.FilledBy + "')",
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("Create");
                var data = [];

                res.send({ dieselConsumedInfo: data });
            }
        });

});

app.post('/services/dieselConsumed/Delete', function (req, res) {
    con.query("DELETE FROM DIESELCONSUMED WHERE DieselConsumedId =" + req.body.DieselConsumedId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("success deleted");
            }
        });

    console.log("Deleted Successfully");
    res.send({ dieselConsumedInfo: null });
});


app.get('/services/RMCReceived', function (req, res) {

    con.query("Select * from RMCReceived order by DCNo desc", function (err, rows, fields) {
        if (!!err)
            console.log("error");
        else {
            console.log("success");
            var data = [];
            for (i = 0 ; i < rows.length ; i++) {

                data.push({
                    "DCNo": rows[i].DCNo, "Date": rows[i].Date, "UoM": rows[i].UoM,
                    "Qty": rows[i].Qty, "Particulars": rows[i].Particulars,
                    "SiteName": rows[i].SiteName, "Labour": rows[i].Labour, "TruckNo": rows[i].TruckNo
                });

                //data.push(rows[i].Date);
                //data.push(rows[i].Particulars);
                //data.push(rows[i].Machinery);
                //data.push(rows[i].Qty);
                //data.push(rows[i].SiteName);
                //data.push(rows[i].Chinage);
                //data.push(rows[i].FilledBy);
                //data.push(rows[i].ClosingQty);
            }
            res.send({ RMCReceivedInfo: data });
        }
    });

});

app.post('/services/RMCReceived/Update', function (req, res) {

    con.query("UPDATE RMCReceived SET Particulars='" + req.body.Particulars + "',Qty=" + req.body.Qty + "," + "SiteName='" +
        req.body.SiteName + "'," + "Labour='" + req.body.Labour + "'," + "UoM='" + req.body.UoM + "'," +
        "TruckNo=" + req.body.TruckNo + "," + "Qty='" + req.body.Qty
        + "',Date ='" + dateFormat(req.body.Date, "yyyy-mm-dd") + "' WHERE DCNo =" + req.body.DCNo,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("Update");
                res.send({ RMCReceivedInfo: null });
            }
        });

    console.log("Updated Successfully");

});

app.post('/services/RMCReceived/Create', function (req, res) {

    con.query("INSERT INTO RMCReceived (Date,Particulars,Qty,UoM,SiteName,Labour,TruckNo) VALUES ('"
        + dateFormat(req.body.Date, "yyyy-mm-dd") + "','" + req.body.Particulars + "'," + req.body.Qty + ",'" + req.body.UoM + "','" + req.body.SiteName
        + "','" + req.body.Labour + "','" + req.body.TruckNo + "')",
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("Create");
                var data = [];

                res.send({ RMCReceivedInfo: data });
            }
        });

});

app.post('/services/RMCReceived/Delete', function (req, res) {
    con.query("DELETE FROM RMCReceived WHERE DCNo =" + req.body.DCNo,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("success deleted");
            }
        });

    console.log("Deleted Successfully");
    res.send({ RMCReceivedInfo: null });
});



app.get('/services/RMCConsumed', function (req, res) {

    con.query("Select * from RMCConsumed order by RMCConsumedId desc", function (err, rows, fields) {
        if (!!err)
            console.log("error");
        else {
            console.log("success");
            var data = [];
            for (i = 0 ; i < rows.length ; i++) {

                data.push({
                    "RMCConsumedId": rows[i].RMCConsumedId, "Date": rows[i].Date, "RMCPlant": rows[i].RMCPlant,
                    "Qty": rows[i].Qty, "Particulars": { "ParticularsName": rows[i].Particulars },
                    "SiteName": rows[i].SiteName, "UoM": rows[i].UoM
                });

                //data.push(rows[i].Date);
                //data.push(rows[i].Particulars);
                //data.push(rows[i].Machinery);
                //data.push(rows[i].Qty);
                //data.push(rows[i].SiteName);
                //data.push(rows[i].Chinage);
                //data.push(rows[i].FilledBy);
                //data.push(rows[i].ClosingQty);
            }
            res.send({ rmcConsumedInfo: data });
        }
    });

});

app.post('/services/RMCConsumed/Update', function (req, res) {

    con.query("UPDATE RMCConsumed SET Particulars='" + req.body.Particulars.ParticularsName + "',Qty=" + req.body.Qty + "," + "SiteName='" +
        req.body.SiteName + "'," + "RMCPlant='" + req.body.RMCPlant + "'," + "UoM='" + req.body.UoM + "'," 
        + "Date ='" + dateFormat(req.body.Date, "yyyy-mm-dd") + "' WHERE RMCConsumedId =" + req.body.RMCConsumedId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("Update");
                res.send({ rmcConsumedInfo: null });
            }
        });

    console.log("Updated Successfully");

});

app.post('/services/RMCConsumed/Create', function (req, res) {

    con.query("INSERT INTO RMCConsumed (Date, Particulars,Qty,SiteName,RMCPlant,UoM) VALUES ('"
        + dateFormat(req.body.Date, "yyyy-mm-dd") + "','" + req.body.Particulars.ParticularsName + "'," + req.body.Qty + ",'" + req.body.SiteName
        + "','" + req.body.RMCPlant + "','" + req.body.UoM + "')",
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("Create");
                var data = [];

                res.send({ rmcConsumedInfo: data });
            }
        });

});

app.post('/services/RMCConsumed/Delete', function (req, res) {
    con.query("DELETE FROM RMCConsumed WHERE RMCConsumedId =" + req.body.RMCConsumedId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("success deleted");
            }
        });

    console.log("Deleted Successfully");
    res.send({ rmcConsumedInfo: null });
});



app.get('/services/NMRDetails', function (req, res) {

    con.query("Select * from NMR order by NMRId desc", function (err, rows, fields) {
        if (!!err)
            console.log("error");
        else {
            console.log("success");
            var data = [];
            for (i = 0 ; i < rows.length ; i++) {

                data.push({
                    "NMRId": rows[i].NMRId, "Date": rows[i].Date, "Location": {"LocationName": rows[i].Location},
                    "Qty": rows[i].Qty, "Particulars": rows[i].Particulars ,
                    "SiteName": rows[i].SiteName, "Male": rows[i].Male, "Chinage": rows[i].Chinage, "Female": rows[i].Female, "Mason": rows[i].Mason, "Description": rows[i].Description
                });

                //data.push(rows[i].Date);
                //data.push(rows[i].Particulars);
                //data.push(rows[i].Machinery);
                //data.push(rows[i].Qty);
                //data.push(rows[i].SiteName);
                //data.push(rows[i].Chinage);
                //data.push(rows[i].FilledBy);
                //data.push(rows[i].ClosingQty);
            }
            res.send({ nmrDetails: data });
        }
    });

});

app.post('/services/NMRDetails/Update', function (req, res) {

    con.query("UPDATE NMR SET Particulars='" + req.body.Particulars + "'," + "SiteName='" +
        req.body.SiteName + "'," + "Chinage='" + req.body.Chinage + "'," + "Location='" + req.body.Location.LocationName + "'," +
        "Female='" + req.body.Female + "'," + "Mason='" + req.body.Mason + "',Male='" + req.body.Male + "'," + "Description='" + req.body.Description
        + "',Date ='" + dateFormat(req.body.Date, "yyyy-mm-dd") + "' WHERE NMRId =" + req.body.NMRId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("Update");
                res.send({ nmrDetails: null });
            }
        });

    console.log("Updated Successfully");

});

app.post('/services/NMRDetails/Create', function (req, res) {

    con.query("INSERT INTO NMR (Date,Particulars,SiteName,Location,Chinage,Male,Female,Mason,Description) VALUES ('"
        + dateFormat(req.body.Date, "yyyy-mm-dd") + "','" + req.body.Particulars + "','" + req.body.SiteName + "','" + req.body.Location.LocationName
        + "','" + req.body.Chinage + "','" + req.body.Male + "','" + req.body.Female + "','" + req.body.Mason + "','" + req.body.Description + "')",
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("Create");
                var data = [];

                res.send({ nmrDetails: data });
            }
        });

});

app.post('/services/NMRDetails/Delete', function (req, res) {
    con.query("DELETE FROM NMR WHERE NMRId =" + req.body.NMRId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("success deleted");
            }
        });

    console.log("Deleted Successfully");
    res.send({ nmrDetails: null });
});

app.get('/passwordReset', function (req, res) {
    var data = [];
    con.query("Select * from login", function (err, rows, fields) {
        if (!!err)
            console.log("error");
        else {
            console.log("success");
            //res.render('login', { sample: "GetData" });

            for (i = 0 ; i < rows.length ; i++) {

                data.push(rows[i].UserId);
                data.push(rows[i].Password);
                data.push(rows[i].IsFirstLogin);
                data.push(rows[i].CreatedOn);
                data.push(rows[i].ModifiedOn);
            }
            var UserInfo = { UserId: data[0], password: data[1], IsFirstLogin: data[2] };
            res.render('pages/passwordReset', {
                UserInfo: UserInfo
            });
        }
    });
});

app.post('/passwordSuccess', function (req, res) {
    var data = [];
    var sql = "UPDATE login SET password = '" + req.body.inputPasswordConfirm + "', IsFirstLogin=" + '0' + " WHERE UserId = '" + req.body.inputEmail + "'";
    con.query(sql, function (err, result) {
        if (!!err)
            console.log("error");
        else {
            console.log("affected rows:", result.affectedRows);
            if (result.affectedRows)
                res.render('pages/passwordSuccess', { message: "Password changed successfully!!" });
            else
                res.render('pages/passwordSuccess', { message: "There was some error. Please try again" });
        }
    });
});

app.get('/services/RawMaterialGroup2', function (req, res) {

    con.query("Select mgr.* from MaterialsGroup2Received mgr " +
				"join MaterialGroup mg on mg.GroupId= mgr.GroupId " +
				"where mgr.GroupId=" + req.query.groupId, function (err, rows, fields) {
				    if (!!err)
				        console.log("error " + err);
				    else {
				        console.log("success machinery read");
				        var data = [];
				        for (i = 0 ; i < rows.length ; i++) {

				            data.push({
				                "DCNo": rows[i].DCNo, "Date": rows[i].Date, "VehicleNo": rows[i].VehicleNo,
				                "TransporterName": rows[i].TransporterName, "Qty": { Qty: rows[i].Qty }, "Particulars": { "ParticularsName": rows[i].Particulars },
				                "SiteName": rows[i].SiteName,"Location": { "LocationName": rows[i].Location }, "Chinage": rows[i].Chinage, "SupplierName": rows[i].SupplierName
				            });

				            //data.push(rows[i].Date);
				            //data.push(rows[i].DcNo);
				            //data.push(rows[i].Particulars);
				            //data.push(rows[i].SiteName);
				            //data.push(rows[i].SupplierName);
				            //data.push(rows[i].Qty);
				            //data.push(rows[i].Location);
				            //data.push(rows[i].Chinage);
				            //data.push(rows[i].VehicleNo);
				            //data.push(rows[i].TransporterName);
				            //data.push(rows[i].GroupId);
				        }
				        res.send({ RawMaterials: data });
				    }
				});

});

app.post('/services/RawMaterialGroup2/Update', function (req, res) {

    con.query("UPDATE MaterialsGroup2Received SET Particulars='" + req.body.Particulars.ParticularsName + "',TransporterName='" + req.body.TransporterName + "'," + "SiteName='" +
        req.body.SiteName + "'," + "VehicleNo='" + req.body.VehicleNo + "'," + "Qty=" + req.body.Qty.Qty + "," +
        "SupplierName='" + req.body.SupplierName + "'," + "Location='" + req.body.Location.LocationName + "'," + "Chinage='" + req.body.Chinage + "',"
        + "Date ='" + dateFormat(req.body.Date, "yyyy-mm-dd") + "' WHERE DCNo=" + req.body.DCNo,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("Update");
                res.send({ RawMaterials: null });
            }
        });

    console.log("Updated Successfully");

});

app.post('/services/RawMaterialGroup2/Create', function (req, res) {

    con.query("INSERT INTO MaterialsGroup2Received (Particulars,TransporterName,SiteName,VehicleNo,Qty,SupplierName,Location,Chinage,Date,GroupId) VALUES ('"
    + req.body.Particulars.ParticularsName + "','" + req.body.TransporterName + "','" + req.body.SiteName + "','" + req.body.VehicleNo + "',"
    + req.body.Qty.Qty + ",'" + req.body.SupplierName + "','" + req.body.Location.LocationName + "','" + req.body.Chinage + "','" + dateFormat(req.body.Date, "yyyy-mm-dd") + "'," + req.body.GroupId + ")",
    function (err, rows, fields) {
        if (!!err)
            console.log(err);
        else {
            console.log("Create");
            var data = [];
            res.send({ RawMaterials: data });
        }
    });

});

app.post('/services/RawMaterialGroup2/Delete', function (req, res) {
    con.query("DELETE FROM MaterialsGroup2Received WHERE DCNo=" + req.body.DCNo,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("success deleted");
            }
        });

    console.log("Deleted Successfully");
    res.send({ RawMaterials: null });
});

app.get('/services/RawMaterialGroup1Consumed', function (req, res) {

    con.query("Select mgr.* from MaterialsGroup1Consumed mgr " +
				"join MaterialGroup mg on mg.GroupId= mgr.GroupId " +
				"where mgr.GroupId=" + req.query.groupId, function (err, rows, fields) {
				    if (!!err)
				        console.log("error " + err);
				    else {
				        console.log("success group1 consume read");
				        var data = [];
				        for (i = 0 ; i < rows.length ; i++) {

				            data.push({
				                "MaterialsGroup1ConsumedId": rows[i].MaterialsGroup1ConsumedId, "Date": rows[i].Date, "ApprovedBy": rows[i].ApprovedBy,
				                "Qty": rows[i].Qty, "Particulars": { "ParticularsName": rows[i].Particulars }, "IssuedBy": rows[i].IssuedBy, "UoM": { "UoMName": rows[i].UoM },
				                "SiteName": rows[i].SiteName, "Location": { "LocationName": rows[i].Location }, "Chinage": rows[i].Chinage, "ClosingQty": rows[i].ClosingQty
				            });

				            //data.push(rows[i].Date);
				            //data.push(rows[i].Particulars);
				            //data.push(rows[i].ApprovedBy);
				            //data.push(rows[i].IssuedBy);
				            //data.push(rows[i].UoM);
				            //data.push(rows[i].Qty);
				            //data.push(rows[i].SiteName);
				            //data.push(rows[i].Location);
				            //data.push(rows[i].Chinage);
				            //data.push(rows[i].ClosingQty);
				            //data.push(rows[i].GroupId);
				        }
				        res.send({ RawMaterials: data });
				    }
				});
});

app.post('/services/RawMaterialGroup1Consumed/Update', function (req, res) {

    con.query("UPDATE MaterialsGroup1Consumed SET Particulars='" + req.body.Particulars.ParticularsName + "',ApprovedBy='" + req.body.ApprovedBy + "'," + "SiteName='" +
        req.body.SiteName + "'," + "UoM='" + req.body.UoM.UoMName + "'," + "Qty=" + req.body.Qty + "," + "IssuedBy='" + req.body.IssuedBy + "'," +
        "ClosingQty=" + req.body.ClosingQty + "," + "Location='" + req.body.Location.LocationName + "'," + "Chinage='" + req.body.Chinage + "',"
        + "Date ='" + dateFormat(req.body.Date, "yyyy-mm-dd") + "' WHERE MaterialsGroup1ConsumedId=" + req.body.MaterialsGroup1ConsumedId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("success");
                res.send({ RawMaterials: null });
            }
        });

    console.log("Updated Successfully");

});

app.post('/services/RawMaterialGroup1Consumed/Create', function (req, res) {

    con.query("INSERT INTO MaterialsGroup1Consumed (Particulars,ApprovedBy,SiteName,UoM,Qty,IssuedBy,ClosingQty,Location,Chinage,Date,GroupId) VALUES ('"
    + req.body.Particulars.ParticularsName + "','" + req.body.ApprovedBy + "','" + req.body.SiteName + "','" + req.body.UoM.UoMName + "',"
    + req.body.Qty + ",'" + req.body.IssuedBy + "'," + req.body.ClosingQty + ",'" + req.body.Location.LocationName + "','" + req.body.Chinage + "','" + dateFormat(req.body.Date, "yyyy-mm-dd") + "'," + req.body.GroupId + ")",
    function (err, rows, fields) {
        if (!!err)
            console.log(err);
        else {
            console.log("success");
            console.log("Create");
            var data = [];
            res.send({ RawMaterials: data });
        }
    });

});

app.post('/services/RawMaterialGroup1Consumed/Delete', function (req, res) {
    con.query("DELETE FROM MaterialsGroup1Consumed WHERE MaterialsGroup1ConsumedId=" + req.body.MaterialsGroup1ConsumedId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("success deleted");
            }
        });

    console.log("Deleted Successfully");
    res.send({ RawMaterials: null });
});

app.get('/services/RawMaterialGroup2Consumed', function (req, res) {

    con.query("Select mgr.* from MaterialsGroup2Consumed mgr " +
				"join MaterialGroup mg on mg.GroupId= mgr.GroupId " +
				"where mgr.GroupId=" + req.query.groupId, function (err, rows, fields) {
				    if (!!err)
				        console.log("error");
				    else {
				        console.log("success machinery read");
				        var data = [];
				        for (i = 0 ; i < rows.length ; i++) {
				            data.push({
				                "MaterialsGroup2ConsumedId": rows[i].MaterialsGroup2ConsumedId, "Date": rows[i].Date, "IssuedBy": rows[i].IssuedBy,
				                "Qty": rows[i].Qty, "Particulars": { "ParticularsName": rows[i].Particulars },
				                "SiteName": rows[i].SiteName, "Location": { "LocationName": rows[i].Location }, "Chinage": rows[i].Chinage, "ClosingQty": rows[i].ClosingQty
				            });

				            //data.push(rows[i].Date);
				            //data.push(rows[i].Particulars);
				            //data.push(rows[i].SiteName);
				            //data.push(rows[i].IssuedBy);
				            //data.push(rows[i].Qty);
				            //data.push(rows[i].Location);
				            //data.push(rows[i].Chinage);
				            //data.push(rows[i].ClosingQty);

				            //data.push(rows[i].GroupId);
				        }
				        res.send({ RawMaterials: data });
				    }
				});

});


app.post('/services/RawMaterialGroup2Consumed/Update', function (req, res) {

    con.query("UPDATE MaterialsGroup2Consumed SET Particulars='" + req.body.Particulars.ParticularsName + "'," + "SiteName='" +
        req.body.SiteName + "'," + "Qty=" + req.body.Qty + "," + "IssuedBy='" + req.body.IssuedBy + "'," +
        "ClosingQty=" + req.body.ClosingQty + "," + "Location='" + req.body.Location.LocationName + "'," + "Chinage='" + req.body.Chinage + "',"
        + "Date ='" + dateFormat(req.body.Date, "yyyy-mm-dd") + "' WHERE MaterialsGroup2ConsumedId=" + req.body.MaterialsGroup2ConsumedId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("Update");
                res.send({ RawMaterials: null });
            }
        });

    console.log("Updated Successfully");

});

app.post('/services/RawMaterialGroup2Consumed/Create', function (req, res) {

    con.query("INSERT INTO MaterialsGroup2Consumed (Particulars,SiteName,Qty,IssuedBy,ClosingQty,Location,Chinage,Date,GroupId) VALUES ('"
    + req.body.Particulars.ParticularsName + "','" + req.body.SiteName + "'," + req.body.Qty + ",'" + req.body.IssuedBy + "',"
    + req.body.ClosingQty + ",'" + req.body.Location.LocationName + "','" + req.body.Chinage + "','" + dateFormat(req.body.Date, "yyyy-mm-dd") + "'," + req.body.GroupId + ")",
    function (err, rows, fields) {
        if (!!err)
            console.log(err);
        else {
            console.log("Create");
            var data = [];
            res.send({ RawMaterials: data });
        }
    });

});

app.post('/services/RawMaterialGroup2Consumed/Delete', function (req, res) {
    con.query("DELETE FROM MaterialsGroup2Consumed WHERE MaterialsGroup2ConsumedId=" + req.body.MaterialsGroup2ConsumedId,
        function (err, rows, fields) {
            if (!!err)
                console.log(err);
            else {
                console.log("success deleted");
            }
        });

    console.log("Deleted Successfully");
    res.send({ RawMaterials: null });
});

app.listen(8083);
console.log('8083 is the magic port');