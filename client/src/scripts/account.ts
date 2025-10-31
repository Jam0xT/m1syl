import config from '../../m1syl.config.ts';

const accountManager = {
    loggedIn: false,
    id: '',
    init() {},
    async reqLogin(id: string, pswd: string) {
        try {
            const res = await fetch(`${config.server_url}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'id': id,
                    'pswd': pswd,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                console.log(data);
            } else {

            }
        } catch (e) {
            console.error(e);
        }
    }
};

export default accountManager;