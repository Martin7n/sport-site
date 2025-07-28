import { Router } from "express";
import complexService from "../services/complexService.js";


const router = Router();

router.get("/add-exercise", async (req, res) => {

    const newEx = await complexService.createExercise()

    res.json(newEx)
})

router.get("/create-complex", async (req, res) => {


    const createdComplex = await complexService.createComplex();
    res.send(createdComplex)


})

router.get("/read-complexes", async (req, res) => {

    const all = await complexService.readComplex()
    // const allt = await complexService.readComplexes({type:"second"})
    const allt = await complexService.readFourRandom()

     res.json(allt)

},

router.get("/random-complex", async(req, res) =>{

    // const complex = await complexService.randomCom({type:"second"})
    const complex = await complexService.randomCom()

    res.json(complex)

})

)

export default router;

