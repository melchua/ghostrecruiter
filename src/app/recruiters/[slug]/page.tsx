"use client";
import { usePathname } from "next/navigation";
import { getRecruiter } from "@/lib/firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button/Button";
import { WriteReviewModal } from "@/components/WriteReviewModal/WriteReviewModal";

type ReviewType = {
  id: string;
  comment: string;
};

type RecruiterType = {
  id: string;
  name: string;
  linkedIn: string;
  avatar: string;
  reviews: ReviewType[];
};

const RecruiterPage = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop(); // Extract the 'slug' from the pathname
  const [recruiter, setRecruiter] = useState<RecruiterType | null>(null);
  const [openReviewModal, setOpenReviewModal] = useState(false);

  async function fetchRecruiter(slug: string) {
    const recruiter = await getRecruiter(slug as string);
    setRecruiter(recruiter);
  }

  useEffect(() => {
    fetchRecruiter(slug as string);
  }, [slug]);

  if (!recruiter) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <WriteReviewModal
        open={openReviewModal}
        onClose={() => setOpenReviewModal(false)}
        title="Review recruiter"
        recruiterId={recruiter?.id}
        onRefetch={() => fetchRecruiter(slug as string)}
      />
      <div className="flex flex-row gap-4 justify-center w-1/2 border-2 border-gray-300 rounded-md p-4 bg-white min-w-[500px]">
        <div>
          <Image
            src={recruiter?.avatar}
            alt={recruiter?.name}
            width="300"
            height="300"
            layout="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1>Ghostsightings for {recruiter?.name}</h1>
          {/* Use the 'slug' parameter */}
          {recruiter?.reviews?.length > 0 ? (
            recruiter?.reviews.map((review) => (
              <div key={review.id}>
                <div>"{review.comment}"</div>
              </div>
            ))
          ) : (
            <Button onClick={() => setOpenReviewModal(true)}>
              Write the first review
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterPage;
