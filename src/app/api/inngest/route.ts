import { processMessage } from "@/features/conversations/inngest/process-message";
import { inngest } from "@/inngest/client";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processMessage,
  ],
});
