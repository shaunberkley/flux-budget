import {
    PhTimer,
    PhQuestion,
    PhXCircle,
    PhCircle,
    PhCheckCircle,
    PhArrowRight,
    PhArrowUp,
    PhArrowDown,
} from "@phosphor-icons/vue";

export const labels = [
    {
        value: "bug",
        label: "Bug",
    },
    {
        value: "feature",
        label: "Feature",
    },
    {
        value: "documentation",
        label: "Documentation",
    },
];

export const statuses = [
    {
        value: "backlog",
        label: "Backlog",
        icon: h(PhQuestion),
    },
    {
        value: "todo",
        label: "Todo",
        // icon: h(PhCircle),
    },
    {
        value: "in progress",
        label: "In Progress",
        // icon: h(PhTimer),
    },
    {
        value: "done",
        label: "Done",
        // icon: h(PhCheckCircle),
    },
    {
        value: "canceled",
        label: "Canceled",
        // icon: h(PhXCircle),
    },
];

export const priorities = [
    {
        label: "Low",
        value: "low",
        // icon: h(PhArrowDown),
    },
    {
        label: "Medium",
        value: "medium",
        // icon: h(PhArrowRight),
    },
    {
        label: "High",
        value: "high",
        // icon: h(PhArrowUp),
    },
];
