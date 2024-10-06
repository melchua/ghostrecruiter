import { addReview } from "@/lib/firebase/firestore";
import { Modal } from "../Modal/Modal";
import { useState } from "react";

interface WriteReviewModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  recruiterId: string;
  onRefetch?: () => Promise<void>;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  open,
  onClose,
  recruiterId,
  onRefetch,
}) => {
  const [comment, setComment] = useState("");

  const handleAddReview = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await addReview({ comment }, recruiterId);
    setComment("");
    onRefetch && (await onRefetch());
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Review recruiter">
      <div className="flex flex-col gap-2 rounded-md p-4 border-2 hover:border-secondary border-gray-300">
        <form className="flex flex-col gap-2 items-center">
          <label htmlFor="comment" className="flex flex-col gap-2">
            <textarea
              id="comment"
              placeholder="Comment"
              className="p-2 w-[600px] decoration-none focus:outline-none resize-none"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            type="submit"
            onClick={handleAddReview}
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};
