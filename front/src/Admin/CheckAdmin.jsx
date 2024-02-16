import React, { useState , useEffect } from 'react';
import { Outlet,Link } from 'react-router-dom';
import axios from 'axios';

export default function CheckAdmin() {
   

    // État pour déterminer si l'authentification est réussie ou non
    const [valid, setValid] = useState(false);

    // Fonction pour soumettre les données du formulaire et vérifier l'authentification
    useEffect(() => {
            axios.get('http://localhost:3001/admin/check')
            .then(res=>{
                if (res.data.Valide == true ) {
                    setValid(true);
                    console.log("Verification Success")
                } else {
                    alert("Vérification échouée");
                    console.log(res.data.message);
                }
            })
            .catch(err=>console.log(err));
    },[]) 

    return (
        <div>
            {valid ?(
                <Outlet/>
            )
            :
            <div>
                <h3>You Are not Allowed to see This Page Please Login as Adminstartor to keep Going</h3>
                <Link to='/LoginAdmin'>Login Admin</Link>
            </div>
        }
           
        </div>
    );
}
