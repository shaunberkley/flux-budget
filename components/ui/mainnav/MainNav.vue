<script setup lang="ts">
    import { cn } from "@/lib/utils";
</script>

<template>
    <nav
        :class="
            cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')
        "
    >
        <a
            href="/dashboard"
            class="text-sm font-medium transition-colors hover:text-primary"
        >
            Dashboard
        </a>
        <a
            href="/companies"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
            Companies
        </a>
        <a
            href="/contacts"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
            Contacts
        </a>
        <a
            href="/notes"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
            Notes
        </a>
        <a
            href="/files"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
            Files
        </a>
        <a
            href="/listings"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
            Listings
        </a>
    </nav>
</template>
