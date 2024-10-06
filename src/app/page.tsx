"use client";
import { useEffect, useState } from "react";
import { getRecruiters } from "../lib/firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { AddRecruiterModal } from "@/components/AddRecruiterModal/AddRecruiterModal";
import { WriteReviewModal } from "@/components/WriteReviewModal/WriteReviewModal";

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
      setRecruiters(recruiters as any);
    };
    fetchRecruiters();
  }, []);

  return (
    <div className="p-4 max-w-screen-md mx-auto">
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
        recruiterId={selectedRecruiter?.id}
      />
      <div className="flex justify-between items-center">
        <h1 className="text-center mb-8">Ghost Recruiters</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
          onClick={() => setOpenAddModal(true)}
        >
          +
        </button>
      </div>

      {recruiters.map((recruiter) => {
        const linkedInUsername = extractLinkedInUsername(recruiter.linkedIn);
        return (
          <div key={recruiter.id} className="border-b border-gray-300 p-4">
            <div className="flex items-center gap-2">
              <a href={recruiter.linkedIn} title={linkedInUsername}>
                <Image
                  src="/images/linkedIn.png"
                  alt="LinkedIn"
                  width="25"
                  height="25"
                />
              </a>
              <h2>{recruiter.name}</h2> {linkedInUsername}{" "}
            </div>
            <footer className="flex gap-2">
              <button
                className="bg-primary text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setSelectedRecruiter(recruiter);
                  setOpenRateModal(true);
                }}
              >
                ⭐️ Write a review
              </button>
              <Link
                className="bg-primary text-white px-4 py-2 rounded-md"
                href={`/recruiters/${recruiter.id}`}
              >
                View reviews
              </Link>
            </footer>
          </div>
        );
      })}
    </div>
  );
}
