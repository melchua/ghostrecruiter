"use client";
import { useEffect, useState } from "react";
import { getRecruiters } from "../lib/firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { AddRecruiterModal } from "@/components/AddRecruiterModal/AddRecruiterModal";
import { WriteReviewModal } from "@/components/WriteReviewModal/WriteReviewModal";
import { Button } from "@/components/Button/Button";

type Recruiter = {
  id: string;
  name: string;
  linkedIn: string;
};

function extractLinkedInUsername(url: string): string {
  const match = url.match(/linkedin\.com\/in\/([^/]+)/);
  return match ? match[1] : "";
}

export default function Home() {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openRateModal, setOpenRateModal] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(
    null
  );

  useEffect(() => {
    const fetchRecruiters = async () => {
      const recruiters = await getRecruiters();
      setRecruiters(recruiters as Recruiter[]);
    };
    fetchRecruiters();
  }, []);

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <AddRecruiterModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        title="Add Recruiter"
        setRecruiters={setRecruiters}
        setOpenAddModal={setOpenAddModal}
      />
      <WriteReviewModal
        open={openRateModal}
        onClose={() => setOpenRateModal(false)}
        title="Rate Recruiter"
        recruiterId={selectedRecruiter?.id || ""}
      />
      <div className="flex justify-center items-center pb-4 transition-transform duration-200 hover:scale-110 sm:static fixed bottom-4 right-10 z-50">
        <button
          className="bg-white text-black font-semibold px-8 py-5 rounded-full text-xl shadow-lg" // Added shadow-lg for box shadow
          onClick={() => setOpenAddModal(true)}
        >
          +
        </button>
      </div>

      <div className="flex flex-row gap-4 flex-wrap justify-center">
        {recruiters.map((recruiter) => {
          const linkedInUsername = extractLinkedInUsername(recruiter.linkedIn);
          return (
            <Link
              className="no-underline text-inherit"
              href={`/recruiters/${recruiter.id}`}
              key={recruiter.id}
            >
              <div
                className="border-b border-gray-300 p-4 h-64 bg-cover bg-center flex flex-col justify-end hover:opacity-98 rounded-sm transition-transform duration-200 hover:scale-105"
                style={{
                  backgroundImage: `url('${recruiter.avatar}')`,
                }}
              >
                <div className="flex flex-col gap-2 bg-white/70 rounded-md p-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={recruiter.linkedIn}
                      title={linkedInUsername}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Image
                        src="/images/linkedIn.png"
                        alt="LinkedIn"
                        width="30"
                        height="30"
                        className="hover:opacity-100 transform transition-transform duration-200 hover:scale-110"
                      />
                    </a>
                    <span className="flex flex-col">
                      <h2>{recruiter.name}</h2>
                      <div className="text-sm">{linkedInUsername}</div>
                    </span>
                  </div>

                  <footer className="flex gap-2">
                    <Button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation(); // Prevents the Link from being triggered
                        e.preventDefault();
                        setSelectedRecruiter(recruiter);
                        setOpenRateModal(true);
                      }}
                    >
                      ⭐️ Add review
                    </Button>
                    <Link
                      className="bg-secondaryDim hover:bg-secondaryDimDim  text-white px-4 py-1 rounded-full text-sm"
                      href={`/recruiters/${recruiter.id}`}
                      onClick={(e) => e.stopPropagation()} // Prevents the Link from being triggered
                    >
                      View reviews
                    </Link>
                  </footer>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
