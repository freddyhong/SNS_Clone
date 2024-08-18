import db from "@/lib/db";
import FormBtn from "@/app/components/form-btn";
import FormInput from "@/app/components/form";
import { addTweet } from "../(contents)/actions";
import { useFormState } from "react-dom";

export default function AddTweet() {
  const [state, dispatch] = useFormState(addTweet, null);
  console.log(state);
  return (
    <form className="w-full flex gap-5 flex-col " action={dispatch}>
      <FormInput
        type="text"
        name="tweet"
        placeholder="Add tweets..."
        required
        errors={state?.formErrors!}
      />
      <FormBtn text="Add Tweet" />
    </form>
  );
}
