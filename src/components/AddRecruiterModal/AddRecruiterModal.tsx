import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { addRecruiter, getRecruiters } from "@/lib/firebase/firestore";

interface AddRecruiterModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  setRecruiters: (recruiters: any) => void;
  setOpenAddModal: (open: boolean) => void;
}

const getRandomAvatar = () => {
  const avatars = [
    "a_pop_art_image_of_an_indifferent_japanese_ghost.jpeg",
    "a_pop_art_image_of_an_indifferent_japanese_ghost-3.jpeg",
    "a_pop_art_image_of_an_indifferent_japanese_ghost-4.jpeg",
    "a_pop_art_image_of_an_indifferent_japanese_ghost-2.jpeg",
    "a_recruiter_in_a_pop_art_style-2.jpeg",
    "a_recruiter_in_a_pop_art_style-3.jpeg",
    "a_recruiter_in_a_pop_art_style-4.jpeg",
    // Add more image filenames here
  ];
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return `/avatars/${avatars[randomIndex]}`;
};

export const AddRecruiterModal: React.FC<AddRecruiterModalProps> = ({
  open,
  onClose,
  title,
  setRecruiters,
}) => {
  const [name, setName] = useState("");
  const [linkedIn, setLinkedIn] = useState("");

  const handleAddRecruiter = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await addRecruiter({ name, linkedIn, avatar: getRandomAvatar() });
    // Fetch the updated list of recruiters
    const updatedRecruiters = await getRecruiters();
    setRecruiters(updatedRecruiters as any);
    setName("");
    setLinkedIn("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <form className="flex flex-col gap-2 items-center">
        <label htmlFor="name" className="flex flex-col gap-2">
          Recruiter Name
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="border-2 border-gray-300 rounded-md p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="linkedin" className="flex flex-col gap-2">
          LinkedIn URL
          <input
            id="linkedin"
            type="text"
            placeholder="LinkedIn URL"
            className="border-2 border-gray-300 rounded-md p-2"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
          />
        </label>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          type="submit"
          onClick={handleAddRecruiter}
        >
          Add
        </button>
      </form>
    </Modal>
  );
};
