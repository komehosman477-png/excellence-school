const express = require("express");

const router = express.Router();


// =====================================================
// SUBMIT ADMISSION APPLICATION
// =====================================================

router.post("/", (req, res) => {

    const {
        first_name,
        last_name,
        date_of_birth,
        gender,
        class_applying_for,
        guardian_name,
        relationship,
        phone,
        email,
        address
    } = req.body;


    const sql = `
        INSERT INTO admissions
        (
            first_name,
            last_name,
            date_of_birth,
            gender,
            class_applying_for,
            guardian_name,
            relationship,
            phone,
            email,
            address
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;


    const values = [
        first_name,
        last_name,
        date_of_birth,
        gender,
        class_applying_for,
        guardian_name,
        relationship,
        phone,
        email,
        address
    ];


    req.db.query(sql, values, (err, result) => {

        if (err) {

            console.error("Admission error:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to save admission application."
            });

        }


        res.status(201).json({

            success: true,

            message:
                "Admission application submitted successfully!",

            applicationId: result.insertId

        });

    });

});



// =====================================================
// GET ONE ADMISSION APPLICATION
// Used for generating the receipt
// =====================================================

router.get("/:id", (req, res) => {

    const applicationId = req.params.id;


    const sql = `
        SELECT *
        FROM admissions
        WHERE id = ?
    `;


    req.db.query(
        sql,
        [applicationId],
        (err, results) => {

            if (err) {

                console.error(
                    "Error retrieving admission:",
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to retrieve application."

                });

            }


            if (results.length === 0) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Application not found."

                });

            }


            res.json({

                success: true,

                application: results[0]

            });

        }

    );

});


module.exports = router;