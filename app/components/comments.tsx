// "use client";
// import React, { useOptimistic } from "react";
// import FormBtn from "./form-btn";
// import FormInput from "./form";
// import { useFormState } from "react-dom";
// import { CommentType, addComment } from "../(contents)/actions";
// import getSession from "../../lib/session";
// import { z } from "zod";
// import { getUser } from "../(contents)/tweets/[id]/actions";

// interface Props {
//   comments: CommentType;
//   tweetId: number;
//   userId: number;
// }

// export default function Comments({ comments, tweetId, userId }: Props) {
//   const [state, reducerFn] = useOptimistic(
//     { comments },
//     (prev, formData: FormData) => {
//       const schema = z
//         .string()
//         .refine((x) => !x.includes("wrong"), "remove keyword: 'wrong'");
//       const data = formData.get("comment");
//       const { success, error, data: comment } = schema.safeParse(data);
//       if (!success || !comment) {
//         return { comments: prev.comments };
//       }

//       return {
//         comments: [
//           ...prev.comments,
//           {
//             id: prev.comments.length + 1,
//             comment,
//             tweetId: tweetId,
//             userId: userId,
//           },
//         ],
//       };
//     }
//   );
//   const action = (payload: FormData) => {
//     reducerFn(payload);
//     dispatch(payload);
//   };

//   const [formState, dispatch] = useFormState(
//     (prevState: any, formData: FormData) =>
//       addComment(prevState, formData, tweetId),
//     null
//   );
//   return (
//     <div className="flex flex-col justify-between h-[75vh]">
//       <div className="flex flex-col gap-3">
//         <h1 className="text-xl font-bold">Comments</h1>
//         {state.comments.length > 0 ? (
//           state.comments.map((r, i) => (
//             <div
//               key={i}
//               className="rounded-lg bg-slate-200 py-3 px-2 w-full flex gap-3"
//             >
//               <div className="w-1/3 text-right">{getUser(r.userId)}:</div>
//               <div className="w-2/3">{r.comment}</div>
//             </div>
//           ))
//         ) : (
//           <h1> There are no comments! </h1>
//         )}
//       </div>

//       <form className="w-fit flex flex-col gap-5" action={action}>
//         <FormInput
//           type="text"
//           name="comment"
//           placeholder="response"
//           required
//           errors={formState?.formErrors}
//         />
//         <div>
//           <FormBtn text="Save response" />
//         </div>
//       </form>
//     </div>
//   );
// }
