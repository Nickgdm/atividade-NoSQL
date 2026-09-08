// 1. Selecione todos os estudantes, ordenando pelo nome em ordem alfabética.
db.estudantes.find().sort({ nome: 1 });


// 2. Selecione todos os estudantes do curso de QA.
db.estudantes.find({ curso: "QA" });


// 3. Selecione todos os estudantes com nota maior ou igual a 7.
db.estudantes.find({ nota: { $gte: 7 } });


// 4. Selecione todos os estudantes que possuem a palavra "Pedro" no nome.
db.estudantes.find({ nome: /Pedro/i });


// 5. Selecione todos os estudantes que fazem mais de um curso.
db.estudantes.find({
    $expr: {
        $gt: [
            {
                $size: {
                    $cond: [
                        { $isArray: "$curso" },
                        "$curso",
                        ["$curso"]
                    ]
                }
            },
            1
        ]
    }
});


// 6. Selecione todos os professores com cargo igual a Professor.
db.professores.find({ cargo: "professor" });


// 7. Selecione todos os professores que lecionam o curso de QA.
db.professores.find({ curso: "QA" });


// 8. Selecione todos os professores que lecionam mais de um curso.
db.professores.find({
    $expr: {
        $gt: [
            {
                $size: {
                    $cond: [
                        { $isArray: "$curso" },
                        "$curso",
                        ["$curso"]
                    ]
                }
            },
            1
        ]
    }
});


// 9. Liste apenas o nome e a nota dos estudantes do curso de SQL.
db.estudantes.find(
    { curso: "SQL" },
    { _id: 0, nome: 1, nota: 1 }
);


// 10. Conte quantos estudantes existem por curso.
db.estudantes.aggregate([
    { $unwind: "$curso" },
    {
        $group: {
            _id: "$curso",
            quantidade: { $sum: 1 }
        }
    },
    { $sort: { _id: 1 } }
]);