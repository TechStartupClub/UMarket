import authPool from "../config/db";

// expected profile structure from Google OAuth
interface GoogleProfile {
    id: string,
    displayName: string,
    emails?: { value: string }[];
};

// user structure in database
/*

ADJUST THE TYPE AFTER MODIFYING THE SUPABASE DATABASE!!!

*/
interface User {
    id: number,
    google_id: string,
    display_name: string,
    email: string,
    create_at: Date;
};

export async function findOrRegisterUser(profile: GoogleProfile): Promise<false | User | undefined> {
    try {
        // check if user already exists
        const existingUser = await authPool.query(
            `SELECT * FROM google_users WHERE google_id = $1`,
            [profile.id]
        );
        if (existingUser.rows.length > 0) {
            return existingUser.rows[0] as User;
        }

        // register new user into the database
        const newUser = await authPool.query(
            `INSERT INTO google_users (google_id, display_name, email) 
             VALUES ($1, $2, $3) RETURNING *`,
            [profile.id, profile.displayName, profile.emails?.[0].value ?? null]
        );
        return newUser.rows[0] as User;
    } catch (error) {
        console.error("Error in findOrRegisterUser utility service:", error);
        throw new Error("Database error occurred");
    }
}