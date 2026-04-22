This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Moodtunes

This project is designed to provide music suggestions based on mood. Users are able to create an account and save searches or create new searches using a MongoDB database integration. The design integrates Tailwind CSS for common styling conventions. 

The project relies on an API with Last.FM, which uses tag based organization. Last.FM's API involvement is based on two crucial factors:

1) It's free.
2) The tagging system has a category for emotions that the song is meant to convey.

The production version of the site sits on a Vercel deployment. 

After logging in, the user should be able to select from the options Happy, Sad, Energetic, Chill, Sleep, Silly, Stressed, and Romantic. Additional tags will be available after beta testing. At this time, custom tags are not available due to the nature of the Last.FM API. After selecting a mood, users will be shown a playlist of suggested songs.

