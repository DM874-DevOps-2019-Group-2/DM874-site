import React, { CSSProperties, HTMLAttributes } from 'react';
import * as Cookies from "js-cookie";

interface AllEmails {
    emails: Array<string>
}

export default class ApiInterface {
    public static async allEmails(host: String): Promise<AllEmails> {
        return this.getAuthenticated<AllEmails>("/admin/allEmails", host)
    }

    public static async getAuthenticated<ReturnInterface>(endpoint: string, host: String): Promise<ReturnInterface> {
        const jwt = Cookies.get('dm874_jwt') as string;

        const additional = () => {
            if (host.startsWith("localhost")) {
                return "http://";
            } else {
                return "";
            }
        };

        let response = await fetch(additional() + host + endpoint, {
            headers: {
                "dm874_jwt": jwt
            }
        });
        return await response.json();
    }

    public static async postAuthenticated<ReturnInterface, PostInterface>(endpoint: string, requestBody: PostInterface, host: String): Promise<ReturnInterface> {
        const jwt = Cookies.get('dm874_jwt') as string;

        const additional = () => {
            if (host.startsWith("localhost")) {
                return "http://";
            } else {
                return "";
            }
        };

        let response = await fetch(additional() + host + endpoint, {
            headers: {
                "dm874_jwt": jwt,
                'Content-Type': 'application/json'
            },
            method: "post",
            body: JSON.stringify(requestBody)
        });
        return await response.json();
    }
}