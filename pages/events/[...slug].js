import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import ResultTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filteredData = router.query.slug;

  const { data, error } = useSWR("/api/events", async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch: ${res.status}`);
    }
    return res.json();
  });

  useEffect(() => {
    if (data) {
      setLoadedEvents(data.events || []);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching events:", error);
    }
  }, [error]);

  let pagHeadeData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="A list of filtered events" />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <>
        {pagHeadeData}
        <p className="center">Loading...</p>;
      </>
    );
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pagHeadeData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        {pagHeadeData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values! </p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        {pagHeadeData}
        <ErrorAlert>
          <p>Failed to load events. {error.message || "Please try again later."}</p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pagHeadeData}
        <ErrorAlert>
          <p>No events found for the chosen filter! </p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <div>
      {pagHeadeData}
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}
