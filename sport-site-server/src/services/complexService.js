import Complex from "../models/Complex.js"
import Exercise from "../models/Exercise.js"


export default {

    createExercise(){
        const newEx = new Exercise(
            {
                type:"basic",
                category: "push",
                subcategory: "bb",
                name: "military press"
            }
        )
        newEx.save()
        return newEx

    },


    async createComplex(filter = {}){

        const erx = await Exercise.find()
        const fst = await Exercise.aggregate([
                    { $match: { category: "push" } },
                    { $sample: { size: 1 } }
                    ]);
        const snd = await Exercise.aggregate([
                       {$match: {category: "pull"}}, 
                    { $sample: { size: 1 } }])
        const trd = await Exercise.aggregate([
                       {$match: {category: "lower"}}, 
                    { $sample: { size: 1 } }])

        const condition = await Exercise.aggregate([
                       {$match: {subcategory: "condition"}}, 
                    { $sample: { size: 1 } }])

        console.log([fst[0]._id, snd[0]._id, trd[0]._id])

        
        const createdComplex = new Complex(
            {
                type: "first",
                equipment: "all",
                exercises: [fst[0]._id, snd[0]._id, trd[0]._id, condition[0]._id]
            }
        )

        createdComplex.save()
        return createdComplex.populate('exercises', 'name -_id');
    },

     readComplex(){

        const complexes = Complex.find({})
        return complexes

    },

    readFourRandom(filter = {}){
        const matchStage = {};

    if (filter.type) {
        matchStage.type = filter.type;
    }

    return Complex.aggregate([
        { $match: matchStage },
        { $sample: { size: 4 } }
    ])
    
    .then(complexes => Complex.populate(
        complexes, 
        { path: 'exercises', select: 'name -_id' }));
        },
        
    readComplexes(filter = {}){
            let query = Complex.find({});

            if (filter.type){
                query = query.where({type: filter.type})
            }
            return query.populate('exercises', 'name -_id');
 
            },
    
    randomCom(filter = {}){
        let query = []

        if (filter.type){
             query.push({ $match: { type: filter.type } });
        }

        query.push({ $sample: { size: 1 } });

        const randomCom=  Complex.aggregate(query);
     
        // const randomCom =  Complex.aggregate([
        // { $match: { type: filter.type } }, 
        // { $sample: { size: 1 } }      
        // ]);
        
        
        return randomCom;


    }


};