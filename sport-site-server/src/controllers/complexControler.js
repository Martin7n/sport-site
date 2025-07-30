import { Router } from "express";
import complexService from "../services/complexService.js";
import Complex from "../models/Complex.js";
import { isAuth } from "../middlewares/auth-middleware.js";


const router = Router();

router.get("/add-exercise", async (req, res) => {

    const newEx = await complexService.createExercise()

    res.json(newEx)
})

router.get("/create-complex", isAuth, async (req, res) => {
  console.log("ETST")
  
    try {
      const userId = req.user?.id || null; 

      const createdComplex = await complexService.createComplex(userId);
      res.json(createdComplex);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error creating complex' });
    }


})

router.get("/read-complexes", async (req, res) => {
    try {
        const userId = req.user?.id;

        const all = await complexService.readComplex()
        // const allt = await complexService.readComplexes({type:"second"})
        // const allt = await complexService.readFourRandom()
        const complexes = await complexService.readFourRandom({}, userId);
        console.log(complexes)
        res.json(complexes)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to load complexes' });
  }

},

router.get("/random-complex", async(req, res) =>{

    // const complex = await complexService.randomCom({type:"second"})
    const complex = await complexService.randomCom()

    res.json(complex)

}),

router.get("list-complexes", async(req, res) =>{
    const userId = req.user?.id;
    const complexes = await listComplexes(userId);
    res.json(complexes);


}),



router.post('/complexes/toggle-like/:id', async (req, res) => {
  try {
    const userId = req.user?.id;   
    const complexId = req.params.id;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const complex = await Complex.findById(complexId);
    if (!complex) return res.status(404).json({ error: 'Complex not found' });

    const likedIndex = complex.likes.findIndex(id => id.toString() === userId.toString());

    if (likedIndex === -1) {
      // Not liked yet - add user
      complex.likes.push(userId);
    } else {
      // Already liked - remove user
      complex.likes.splice(likedIndex, 1);
    }

    await complex.save();

    // Return updated liked status and count
    res.json({
      likedByUser: likedIndex === -1,
      likeCount: complex.likes.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to toggle like' });
  }
}),

  
  router.get('/profile',  isAuth, async (req, res) => {
        
        const userId = req.user?.id;
        console.log(userId);


        if (!userId) {
            return res.status(401).json({ message: '>>  Unauthorized: No user ID' });
        }


    try {
        const likedComplexes = await Complex.find({ likes: userId }).populate('exercises').lean();

        const complexesWithLikeCount = likedComplexes.map(c => ({
            ...c,
            likeCount: c.likes.length,
          }));

      res.json(complexesWithLikeCount);
        // console.log(likedComplexes)
        // res.json(likedComplexes);

    } catch (err) {
 

        console.error('Error fetching liked complexes:', err);  
        res.status(500).json({ message: 'Server error' });
    }
})




)

export default router;

