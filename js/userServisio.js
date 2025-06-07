function users(page){
    document.getElementById('cardHeader').innerHTML = '<h5><i class="fa-solid fa-users"></i> Listado de usuarios</h5>'
    const REQRES_ENDPOINT = 'https://reqres.in/api/users?page='+page
  
}

function getUser(idUser){
    const REQRES_ENDPOINT = 'https://reqres.in/api/users/'+idUser
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((response) =>{
        return response.json().then(
            data => {
                return {
                    status: response.status,
                    info: data
                }
            }
        )
    })
    .then((result) =>{
        if(result.status === 200){
            const user = result.info.data
            showModalUser(user)
        }
        else{
            document.getElementById('info').innerHTML = 
                '<h3>No se encontro el usuario en la Api</h3>'
        }
    })

}




function saveUser(){
    const form = document.getElementById('formAddUser')
    if(form.checkValidity()){
        const first_name = document.getElementById('first_name').value
        const last_name = document.getElementById('last_name').value
        const email = document.getElementById('email').value
        const avatar = document.getElementById('avatar').value
        const user = {first_name, last_name, email, avatar}

        const REQRES_ENDPOINT = 'https://reqres.in/api/users'
        fetch(REQRES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            },
            body: JSON.stringify(user)
        })
        .then((response) =>{
            return response.json().then(
                data => {
                    return {
                        status: response.status,
                        info: data
                    }
                }
            )
        })
        .then((result) =>{
            if(result.status === 201){
                document.getElementById('info').innerHTML = 
                    '<h3 class="text-success">El usuario se guardo correctamente <i class="fa-solid fa-check"></i></h3>'
            }
            else{
                document.getElementById('info').innerHTML = 
                    '<h3 class="text-danger">No se guardo el usuario en la Api <i class="fa-solid fa-x"></i></h3>'
            }
            const modalId = document.getElementById('showModalUser')
            const modal = bootstrap.Modal.getInstance(modalId)
            modal.hide()
        })
    }
    else{
        form.reportValidity()
    }
}