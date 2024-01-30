<template>
    <div>
        <div class="border-b sticky top-0 bg-white">
            <div class="flex h-16 items-center px-4">
                <TeamSwitcher />
                <MainNav class="hidden md:block mx-6" />
                <div class="ml-auto flex items-center space-x-4">
                    <Search class="hidden md:block" />
                    <UserNav />
                </div>
            </div>
        </div>
        <main>
            <slot />
        </main>
    </div>
</template>
