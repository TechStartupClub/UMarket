import authPool from "../config/db";

interface GoogleProfile {
    id: string,
    displayName: string,
    emails?: { value: string }[];
};

interface User {
    user_id: number,
    google_id: string,
    display_name: string,
    email: string,
    created_at: Date;
};

/**
 * Finds or registers a user in the database and links them to a Google OAuth account.
 * 
 * @param profile - Google OAuth profile data
 * @returns A User object if found/created, or false/undefined on failure.
 */
export async function findOrRegisterUser(profile: GoogleProfile): Promise<false | User | undefined> {
    try {
        // check if the user exists by email
        const existingUserQuery = await authPool.query(
            `SELECT * FROM users WHERE email = $1`,
            [profile.emails?.[0].value ?? '']
        );

        let userId: number;
        if (existingUserQuery.rows.length > 0) {
            userId = existingUserQuery.rows[0].user_id;
        } else {
            // register the user if not found
            const newUserQuery = await authPool.query(
                `INSERT INTO users (email, username, auth_provider) 
                 VALUES ($1, $2, $3) RETURNING user_id`,
                [profile.emails?.[0].value ?? '', profile.displayName, 'oauth']
            );
            userId = newUserQuery.rows[0].user_id;
        }

        // check if the OAuth user exists
        const existingOAuthUserQuery = await authPool.query(
            `SELECT * FROM oauth_users WHERE google_id = $1`,
            [profile.id]
        );
        if (existingOAuthUserQuery.rows.length > 0) {
            return existingOAuthUserQuery.rows[0] as User;
        }

        // register the new OAuth user
        const newOAuthUser = await authPool.query(
            `INSERT INTO oauth_users (user_id, google_id, display_name, email) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [userId, profile.id, profile.displayName, profile.emails?.[0].value ?? '']
        );
        return newOAuthUser.rows[0] as User;
    } catch (error) {
        console.error("Error in findOrRegisterUser utility service:", error);
        throw new Error("Database error occurred");
    }
};