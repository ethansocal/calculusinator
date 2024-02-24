import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";

import * as Sentry from "@sentry/react";

Sentry.init({
    dsn: "https://4a0c291edbfc6e9a6d264098c565cf45@o1112946.ingest.sentry.io/4506792449409024",
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
            maskAllText: false,
            blockAllMedia: false,
        }),
        Sentry.feedbackIntegration({
            // Additional SDK configuration goes in here, for example:
            colorScheme: "system",
            showBranding: false,
        }),
    ],
    beforeSend(event, hint) {
        // Check if it is an exception, and if so, show the report dialog
        if (event.exception && event.event_id) {
            Sentry.showReportDialog({ eventId: event.event_id });
        }
        return event;
    },
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: [
        "localhost",
        /^https:\/\/ethansocal\.github\.io\/[\s\S]+/,
    ],
    // Session Replay
    replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    enabled: process.env.NODE_ENV === "production",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <DevSupport
            ComponentPreviews={ComponentPreviews}
            useInitialHook={useInitial}
        >
            <App />
        </DevSupport>
    </React.StrictMode>,
);
