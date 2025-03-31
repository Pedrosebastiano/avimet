import { doc, getDoc, updateDoc, arrayUnion, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../credenciales.js";

export const saveReservation = async (reservationData) => {
  // This is where you'd typically make an API call to your backend
  // to save the reservation data
  console.log('Saving reservation:', reservationData);
  
  // Ensure destinationSlug is defined
  if (!reservationData.excursionId) {
      console.error('Error: destinationSlug is undefined');
      return;
  }

  await addDestinationToUser(reservationData.userId, reservationData.excursionId);
  await addReservationToExcursion(reservationData.excursionId, reservationData);

  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Reservation saved successfully' });
    }, 1000);
  });
};

export const addDestinationToUser = async (userId, slug) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // Log the slug value before updating
      console.log('Adding slug to destinations:', slug);

      // Validate slug is not undefined
      if (!slug) {
        throw new Error('slug is undefined');
      }

      // Add the new destination slug to the current destinations
      await updateDoc(userRef, {
        destinations: arrayUnion(slug)
      });

      console.log(`Destination ${slug} added to user ${userId}'s destinations.`);
    } else {
      console.error(`User with ID ${userId} not found.`);
    }
  } catch (error) {
    console.error("Error adding destination to user:", error.message);
  }
};

export const addReservationToExcursion = async (excursionId, reservationData) => {
  try {
    const excursionRef = doc(db, "destinations", excursionId);
    const excursionDoc = await getDoc(excursionRef);

    if (excursionDoc.exists()) {
      // Add the reservation data to the reservations subcollection
      const reservationsCollectionRef = collection(excursionRef, "reservations");
      await addDoc(reservationsCollectionRef, reservationData);

      console.log(`Reservation added to excursion ${excursionId}'s reservations.`);
    } else {
      console.error(`Excursion with ID ${excursionId} not found.`);
    }
  } catch (error) {
    console.error("Error adding reservation to excursion:", error.message);
  }
};


export const getUserReservations = async (userId) => {
  try {
    const userReservations = [];

    // Get all destinations
    const destinationsSnapshot = await getDocs(collection(db, "destinations"));
    for (const destinationDoc of destinationsSnapshot.docs) {
      const destinationId = destinationDoc.id;

      // Query the reservations subcollection for the current destination
      const reservationsQuery = query(
        collection(db, "destinations", destinationId, "reservations"),
        where("userId", "==", userId)
      );

      const reservationsSnapshot = await getDocs(reservationsQuery);
      reservationsSnapshot.forEach((reservationDoc) => {
        userReservations.push({
          destinationId,
          ...reservationDoc.data()
        });
      });
    }

    return userReservations;
  } catch (error) {
    console.error("Error getting user reservations:", error);
    return [];
  }
};

export const getDestinationById = async (destinationId) => {
  try {
      const docRef = doc(db, 'destinations', destinationId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          return docSnap.data();
      } else {
          console.log('No such document!');
          return null;
      }
  } catch (error) {
      console.error('Error fetching destination:', error);
      throw error;
  }
};

