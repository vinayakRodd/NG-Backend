

const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
const myDb = require('./MongoDb')
const App = new express()
const PORT = process.env.PORT || 9000;
const SecondYearPdf = require("./SecondYearPdf")
const PhysicsCyclePdf = require("./PhysicsCyclePdf")
const ChemistryCyclePdf = require("./ChemistryCyclePdf")

App.use(cors({
  origin: '*'
 
}));

App.use(bp.json())



App.use("/api/PhysicsCycle",PhysicsCyclePdf)
App.use("/api/ChemistryCycle",ChemistryCyclePdf)
App.use("/api/SecondYear",SecondYearPdf)


App.post("/api/GetPhysicsCycleSubjects",async(req,resp)=>{

    const PhysicsCycleCollection = myDb.collection("PhysicsCycle")

    const SearchedSubject = req.body.SubjectName
    console.log(SearchedSubject)

    const regex = new RegExp(SearchedSubject, 'i'); 

    const Subjects = await PhysicsCycleCollection.find({ SubjectName: regex }).toArray();

    console.log(Subjects)

    resp.send(Subjects);
})


App.post("/api/GetChemistryCycleSubjects",async(req,resp)=>{

    const ChemistryCycleCollection = myDb.collection("ChemistryCycle")

    const SearchedSubject = req.body.SubjectName
    console.log(SearchedSubject)

    const regex = new RegExp(SearchedSubject, 'i'); 

    const Subjects = await ChemistryCycleCollection.find({ SubjectName: regex }).toArray();

    console.log(Subjects)

    resp.send(Subjects);
})


App.post("/api/LabVideos",async(req,resp)=>{

    const LabVideosCollection = myDb.collection("LabVideos")

    const res = await LabVideosCollection.find({}).toArray();

    resp.send(res);
})



App.post("/api/GetSearchedBranchRelatedSubjects",async(req,resp)=>{

    const Collection = null

    const SearchedSubject = req.body.SubjectName
    const Branch = req.body.Branch


    console.log(SearchedSubject)



    const regex = new RegExp(SearchedSubject, 'i');

    const Subjects = [];
    if(Branch === "CSE"){
        Collection = myDb.collection("CSE")
        Subjects = await Collection.find({ SubjectName: regex }).toArray();
    }
    else
    if(Branch === "ISE"){
        Collection = myDb.collection("ISE")
        Subjects = await Collection.find({ SubjectName: regex }).toArray();
    }
    else
    if(Branch === "ECE"){
        Collection = myDb.collection("ECE")
        Subjects = await Collection.find({ SubjectName: regex }).toArray();
    }
    else
    if(Branch === "ETE"){
        Collection = myDb.collection("ETE")
        Subjects = await Collection.find({ SubjectName: regex }).toArray();
    }
   

    console.log(Subjects)

    resp.send(Subjects);
})


App.post("/api/getBranchRelatedPYQ", async (req, resp) => {
    try {
        let Collection;
        const Sem = req.body.Sem;
        const Branch = req.body.Branch;

        if (!Sem || !Branch) {
            return resp.status(400).send('Sem and Branch are required');
        }

        switch (Branch) {
            case "CSE":
                Collection = myDb.collection("CSE");
                break;
            case "ISE":
                Collection = myDb.collection("ISE");
                break;
            case "ECE":
                Collection = myDb.collection("ECE");
                break;
            case "ETE":
                Collection = myDb.collection("ETE");
                break;
            default:
                return resp.status(400).send('Invalid Branch');
        }

        const Subjects = await Collection.find({ Sem: Sem }).toArray();
        console.log(Subjects);
        resp.send(Subjects);
    } catch (error) {
        console.error('Error fetching branch-related PYQ:', error);
        resp.status(500).send('Internal Server Error');
    }
});



App.listen(PORT,'0.0.0.0',err=>{

    if(err)
        console.log(err)
    else
        console.log("Server Running at port "+PORT)
})
