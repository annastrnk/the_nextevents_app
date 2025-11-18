import { connectDatabase, getAllDocuments, getDocumentById } from "../db";
import { COLLECTIONS } from "../constants";


function formatEvent(event) {
  return {
    id: event._id.toString(),
    title: event.title,
    description: event.description,
    location: event.location,
    date: event.date,
    image: event.image,
    isFeatured: event.isFeatured,
  };
}


export async function getAllEvents() {
  let client;

  try {
    client = await connectDatabase();
    const events = await getAllDocuments(client, COLLECTIONS.EVENTS, { date: 1 });
    return events.map(formatEvent);
  } catch (error) {
    throw new Error(`Failed to get events: ${error.message}`);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export async function getFeaturedEvents() {
  let client;

  try {
    client = await connectDatabase();
    const events = await getAllDocuments(
      client,
      COLLECTIONS.EVENTS,
      { date: 1 },
      { isFeatured: true }
    );
    return events.map(formatEvent);
  } catch (error) {
    throw new Error(`Failed to get featured events: ${error.message}`);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export async function getEventById(id) {
  let client;

  try {
    client = await connectDatabase();
    const event = await getDocumentById(client, COLLECTIONS.EVENTS, id);
    
    if (!event) {
      return null;
    }

    return formatEvent(event);
  } catch (error) {
    throw new Error(`Failed to get event: ${error.message}`);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  try {
    const allEvents = await getAllEvents();
    
    return allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === year && 
        eventDate.getMonth() === month - 1
      );
    });
  } catch (error) {
    throw new Error(`Failed to get filtered events: ${error.message}`);
  }
}

