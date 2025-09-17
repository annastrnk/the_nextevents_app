import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/events-search";
import { useRouter } from "next/router";

export default function AllEventsPage(props) {
  const {events} = props
  const router = useRouter()

  function findEventsHandler(year, month) {
    const fullPath =`/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <>
      <EventSearch onSearch={findEventsHandler}/>
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps(){
  const events = await getAllEvents()
    return{
      props:{
        events:events
      },
      revalidate:60
    }
}
