const registerForm = document.getElementById('register-form')

if(registerForm){
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        try {
            const res = await fetch('http://localhost:3000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.message || 'Erro ao registrar')
                return
            }

            alert('Registrado com sucesso, faça login!!')
            window.location.href = 'register.html'
        } catch (error) {
            console.error(error);
            alert('Erro de conexão')
        }
    })
}