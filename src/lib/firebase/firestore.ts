import { db } from "./firebase";
import { addDoc, collection, doc, getDocs, getDoc } from "firebase/firestore";

type ReviewType = {
  comment: string;
};

type RecruiterType = {
  name: string;
  linkedIn: string;
  avatar: string;
};

export async function addReview(data: ReviewType, recruiterId: string) {
  console.log("data", data);

  const recruiterRef = doc(db, "recruiters", recruiterId);
  const reviewRef = collection(recruiterRef, "reviews");

  await addDoc(reviewRef, data),
    {
      comment: data.comment,
    };
}

export async function addRecruiter(data: RecruiterType) {
  await addDoc(collection(db, "recruiters"), {
    name: data.name,
    linkedIn: data.linkedIn,
    avatar: data.avatar,
  });
}

export async function getRecruiters() {
  const recruiters = await getDocs(collection(db, "recruiters"));
  return recruiters.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getRecruiter(slug: string) {
  const recruiterRef = doc(db, "recruiters", slug);
  const recruiter = await getDoc(recruiterRef);
  const recruiterId = recruiter.id;

  const recruiterWithId = {
    ...(recruiter.data() as RecruiterType),
    id: recruiterId,
  };

  const reviewsSnapshot = await getDocs(collection(recruiterRef, "reviews"));
  const reviews = reviewsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as ReviewType),
  }));

  return { ...recruiterWithId, reviews };
}
