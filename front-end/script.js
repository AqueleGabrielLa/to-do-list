const loginForm = document.getElementById('login-form')

if(loginForm){
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        try {
            const res = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()

            if(!res.ok){
                alert(data.message || 'Erro ao fazer login')
                return
            }

            localStorage.setItem('token', data.token)
            window.location.href = 'index.html'
        } catch (error) {
            console.error(error);
            alert('Erro de conexão')
        }
    })
}