import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import supabase from '/utils/supabase'; // Adjust the path to your supabase utility file

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      // Destructure the user object to get the email
      const email  = user.profile.email;

      try {
        // Check if the user already exists in the database
        const { data, error } = await supabase
          .from('users')
          .select('email')
          .eq('email', email)
          .single();


        if (!data) {
            await supabase.from('users').insert([{ email: email }]);
        }

        // Return true to allow sign-in
        return true;
      } catch (error) {
        console.error('Error during sign-in callback:', error);
        return false; // Prevent sign-in if an error occurs
      }
    },
  },
});

export { handler as GET, handler as POST }