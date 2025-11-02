import { defineStore } from 'pinia';
import config from "../../m1syl.config.ts";

export const accountStore = defineStore('account', {
    state: () => ({
        loggedIn: false,
        id: '',
        accessToken: '',
    }),
    actions: {
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
                    this.loggedIn = true;
                    this.id = id;
                    this.accessToken = data.accessToken;
                    return 0;
                } else if (res.status === 401) {
                    return 2;
                } else {
                    return 3;
                }
            } catch (e) {
                console.error(e);
                return 1;
            }
        },
        logout() {
            this.id = '';
            this.loggedIn = false;
            this.accessToken = '';
        }
    }
});
