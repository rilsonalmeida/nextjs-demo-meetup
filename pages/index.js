import MeetupList from "../components/meetups/MeetupList";
import Head from 'next/head'
import { Fragment } from 'react'
import { MongoClient } from 'mongodb'

// const DUMMY_MEETUPS = [
//     {
//       id: "m1",
//       title: "A First Meetup",
//       address: "Neverland 123, Some City",
//       image: "/images/kuala-lumpur.jpg",
//       description: "This is our first dummy meetup",
//     },
//     {
//       id: "m2",
//       title: "A Second Meetup",
//       address: "Salvador da Bahia, 333",
//       image: "/images/panorama-miami.jpg",
//       description: "This is our second dummy meetup",
//     },
//   ];

function HomePage(props) {

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="A demo project using React with NextJS. Don´t loose these wonderful meetups and stay in tune with the IT market" />
      </Head>
      <MeetupList meetups={props.meetups} /> 
    </Fragment> )
}


// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }


export async function getStaticProps() {

  const client = await MongoClient.connect(
    "mongodb+srv://rilson:sRrZugPIDlggKnxi@cluster0.i0ln7.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray()  
  client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString()
      }))
    },
    revalidate: 300
  };
}

export default HomePage;
