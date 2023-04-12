import { useRouter } from 'next/router';
import styles from './Home.module.css';

export default function Page() {
  const router = useRouter();
  return (
    <section className={styles.container}>
      <h1>Axie infinity Origins - Battle replays overlay</h1>
      <h2>This is a web overlay meant to generate a video overlay for your battle replays or live streams, it will display the axies IDs, cards, runes and charms for the battle in a nice way.</h2>
      <h3>The overlay size is 1920x1080, so you can record the website screen with OBS using the browser source.</h3>

      <h4>How to use:</h4>
      <ol>
        <li>Go to the battle history on the Axie Infinity Origins game</li>
        <li>Copy the url for the replay</li>
        <li>Paste the url in the form below</li>
      </ol>

      <form onSubmit={(e) => {
        // redirect to the battle page
        e.preventDefault();
        // get the url value form the form
        const url = (e.currentTarget.elements.namedItem('url') as HTMLInputElement).value;
        const battleId = url.split('q=')[1]?.split('&')[0];
        const userId = url.split('userId=')[1];
        if (!url || !battleId || !userId) {
          return alert('Please enter a valid url');
        }
        router.push(`/battle/${battleId}?userId=${userId}`);
      }}>
        <label>
          Battle replay url:
          <input type="url" name="url" placeholder='https://storage.googleapis.com/origin-production/origin.html?f=rpl&q=b70acb54-8af5-4f01-8153-599af656babe&userId=1ec9eb6f-4627-66dd-a60c-385eec68416a' />
        </label>
        <input type="submit" value="Generate battle overlay" />
      </form>

      {/* <h4>For live streams:</h4>
      <ol>
        <li>Go to the Axie Infinity Origins game, click on your avatar (top right corner)</li>
        <li>Copy the User ID</li>
        <li>Paste the User ID in the form below</li>
      </ol>

      <form onSubmit={(e) => {
        // redirect to the battle page
        e.preventDefault();
        // get the userId value form the form
        const userId = (e.currentTarget.elements.namedItem('userId') as HTMLInputElement).value;
        if (!userId) {
          return alert('Please enter a valid user ID');
        }

        router.push(`/live?userId=${userId}`);
      }}>
        <label>
          User ID:
          <input type="text" name="userId" placeholder='1ec9eb6f-4627-66dd-a60c-385eec68416a' />
        </label>
        <input type="submit" value="Submit" />
      </form> */}
    </section>
  );
}
