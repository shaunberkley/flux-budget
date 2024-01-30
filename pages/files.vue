<template>
    <main class="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section class="w-full" v-if="!filesLoading">
            <div class="flex justify-between items-start gap-4 mb-4 py-2">
                <div class="flex items-start mt-1 gap-4">
                    <h1 class="text-lg font-bold">Files</h1>
                    <BreadcrumbsComponent
                        v-if="breadcrumbs && currentFolderId"
                        class="hidden sm:block"
                        :rootItem="rootItem"
                        :items="breadcrumbs"
                        :currentItem="currentItem"
                        @selectBreadcrumb="selectFolder($event)"
                    ></BreadcrumbsComponent>
                </div>
                <div class="flex items-center gap-2">
                    <div>
                        <label
                            tabindex="0"
                            @keydown.enter="($event) => { if ($event) { ($event.target as HTMLInputElement).click(); } }"
                            class="inline-block text-sm hover:cursor-pointer py-2 px-4 rounded-md border-0 font-semibold bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        >
                            Upload
                            <input
                                id="file"
                                type="file"
                                @change="uploadFile"
                                class="hidden"
                                aria-hidden="true"
                            />
                        </label>
                    </div>
                    <ButtonComponent
                        :style="'secondary'"
                        @click="openAddFolderDialog()"
                        ><FolderPlusIcon class="w-5 h-5 text-gray-400"
                    /></ButtonComponent>
                </div>
            </div>
            <BreadcrumbsComponent
                v-if="breadcrumbs && currentFolderId"
                class="block sm:hidden mb-8 ml-0"
                :rootItem="rootItem"
                :items="breadcrumbs"
                :currentItem="currentItem"
                @selectBreadcrumb="selectFolder($event)"
            ></BreadcrumbsComponent>
            <h2 v-if="folders.length" class="font-bold text-sm">Folders</h2>
            <div
                class="mt-4 flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start"
            >
                <div
                    v-for="item in folders"
                    class="relative flex flex-col bg-white w-full sm:w-40 sm:h-40 px-4 py-2 sm:p-4 shadow rounded-lg sm:rounded-2xl"
                >
                    <div
                        class="flex gap-4 items-center sm:block cursor-pointer sm:mt-5 mr-5 sm:mr-0"
                        @click="selectFolder(item)"
                    >
                        <div class="sm:mt-3 sm:flex-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width=".75"
                                stroke="currentColor"
                                class="w-8 h-8 sm:w-12 sm:h-12 text-gray-500 mx-auto"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                                />
                            </svg>
                            <div
                                class="-mt-[19px] sm:-mt-[26px] mx-auto text-center text-xs text-gray-500"
                                v-if="item.children?.length"
                            >
                                {{ item.children?.length }}
                            </div>
                        </div>
                        <div
                            class="text-xs font-medium text-center break-words"
                        >
                            {{ item?.name }}
                        </div>
                    </div>
                    <!-- <Menu
                        as="div"
                        class="absolute -top-0.5 right-0 text-left z-40"
                    >
                        <div>
                            <MenuButton
                                class="absolute top-3 right-3 p-1 rounded-lg hover:bg-gray-50"
                            >
                                <EllipsisVerticalIcon
                                    class="h-5 w-5 text-gray-400 hover:text-gray-800"
                                ></EllipsisVerticalIcon>
                            </MenuButton>
                        </div>

                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <MenuItems
                                class="absolute right-0 mt-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                <div class="px-1 py-1">
                                    <MenuItem v-slot="{ active }">
                                        <button
                                            :class="[
                                                active
                                                    ? 'bg-violet-500 text-white'
                                                    : 'text-gray-900',
                                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                            ]"
                                        >
                                            <PencilSquareIcon
                                                class="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true"
                                            />
                                            Rename
                                        </button>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                        <button
                                            @click.stop="
                                                openMoveFile(item.id, 'folder')
                                            "
                                            :class="[
                                                active
                                                    ? 'bg-violet-500 text-white'
                                                    : 'text-gray-900',
                                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                            ]"
                                        >
                                            <ArrowTopRightOnSquareIcon
                                                class="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true"
                                            />
                                            Move
                                        </button>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                        <button
                                            @click="archiveFolder(item)"
                                            :class="[
                                                active
                                                    ? 'bg-violet-500 text-white'
                                                    : 'text-gray-900',
                                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                            ]"
                                        >
                                            <ArchiveBoxIcon
                                                class="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true"
                                            />
                                            Archive
                                        </button>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </transition>
                    </Menu> -->
                </div>
            </div>
            <h2 v-if="files.length" class="font-bold text-sm mt-8">Files</h2>
            <div class="mt-2 flex flex-wrap gap-3 sm:gap-4">
                <div
                    v-for="item in files"
                    class="relative flex flex-col bg-white w-36 h-36 sm:w-40 sm:h-40 p-4 shadow rounded-2xl"
                >
                    <div class="cursor-pointer mt-8" @click="selectFile(item)">
                        <div
                            class="text-xs font-medium text-center break-words"
                        >
                            {{ item?.name }}
                        </div>
                    </div>
                    <!-- <Menu as="div" class="absolute top-0 right-0 text-left">
                        <div>
                            <MenuButton
                                class="absolute top-3 right-3 p-1 rounded-lg hover:bg-gray-50"
                            >
                                <EllipsisVerticalIcon
                                    class="h-5 w-5 text-gray-400 hover:text-gray-800"
                                ></EllipsisVerticalIcon>
                            </MenuButton>
                        </div>

                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <MenuItems
                                class="absolute right-0 mt-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                <div class="px-1 py-1">
                                    <MenuItem v-slot="{ active }">
                                        <button
                                            :class="[
                                                active
                                                    ? 'bg-violet-500 text-white'
                                                    : 'text-gray-900',
                                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                            ]"
                                        >
                                            <PencilSquareIcon
                                                class="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true"
                                            />
                                            Rename
                                        </button>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                        <button
                                            @click.stop="
                                                openMoveFile(item.id, 'file')
                                            "
                                            :class="[
                                                active
                                                    ? 'bg-violet-500 text-white'
                                                    : 'text-gray-900',
                                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                            ]"
                                        >
                                            <ArrowTopRightOnSquareIcon
                                                class="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true"
                                            />
                                            Move
                                        </button>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                        <button
                                            @click="archiveFile(item.id)"
                                            :class="[
                                                active
                                                    ? 'bg-violet-500 text-white'
                                                    : 'text-gray-900',
                                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                            ]"
                                        >
                                            <ArchiveBoxIcon
                                                class="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true"
                                            />
                                            Archive
                                        </button>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </transition>
                    </Menu> -->
                </div>
                <div
                    v-if="folders && !folders.length && files && !files.length"
                    class="text-sm text-gray-400 mt-6"
                >
                    This directory is empty
                </div>
                <div v-if="!currentItem" class="text-sm text-gray-400 mt-6">
                    Directory does not exist
                </div>
            </div>
        </section>
        <section class="my-8">
            <LoaderComponent v-if="filesLoading"></LoaderComponent>
        </section>
    </main>
    <FolderNavigationComponent
        v-if="foldersTree"
        :folders="foldersTree"
        :showPopup="moveFolderDialogOpen"
        rootId="0"
        @close="moveFolderDialogOpen = false"
        @move-file="moveFile"
    ></FolderNavigationComponent>
    <DialogComponent
        :isOpen="addFolderDialogOpen"
        @closeModal="addFolderDialogOpen = false"
        title="Add folder"
    >
        <div class="mt-4">
            <InputComponent
                id="folder-name"
                name="folderName"
                type="text"
                autocomplete="folderName"
                label="Folder name"
                v-model="folderName"
            ></InputComponent>
            <div class="flex justify-end gap-4 mt-3">
                <ButtonComponent
                    :style="'secondary'"
                    class="mt-6"
                    @click="addFolderDialogOpen = false"
                    >Cancel</ButtonComponent
                >
                <ButtonComponent
                    :style="'primary'"
                    @click="createFolder(folderName ?? '')"
                    :disabled="!folderName"
                    class="mt-6"
                    >Save</ButtonComponent
                >
            </div>
        </div>
    </DialogComponent>
</template>

<script setup lang="ts">
    import { userProfileStore } from "../store";

    type ItemType = "file" | "folder";

    export interface File {
        id: string;
        path: string;
        thumbnail: string;
        profile: string;
        name: string;
        type: string;
        size: number;
        created_at: Date;
        folder: string | null;
        archived: boolean;
    }

    export interface Folder {
        id: string;
        created_at: Date | string;
        parent: string | null;
        name: string;
        archived: boolean;
        children: Folder[] | undefined;
    }

    const files = ref<File[]>([]);
    const folders = ref<Folder[]>([]);
    const foldersTree = ref<Folder[]>();
    const currentFolderId = ref<string | undefined>(undefined);
    const currentFolderPath = ref<string>("/");
    const addFolderDialogOpen = ref<boolean>(false);
    const moveFolderDialogOpen = ref<boolean>(false);

    const rootItem = ref<Folder>({
        id: "0",
        created_at: new Date("4/03/2023"),
        parent: null,
        name: "Root",
        children: undefined,
        archived: false,
    });

    const currentItem = ref<Folder>(rootItem.value);

    const allFolders = ref<Folder[]>();

    const allFiles = ref<File[]>();

    const breadcrumbs = ref<Folder[]>();

    const filesLoading = ref<boolean>(true);

    const folderName = ref<string>();

    const activeItem = ref<string>();
    const activeItemType = ref<ItemType>();

    async function selectFolder(item: Folder) {
        if (item.id === "0") currentFolderId.value = undefined;
        else currentFolderId.value = item.id;
        await updateCurrentFolderPath();
        await getFiles();
        await getFolders();
        currentItem.value = item;
    }

    async function selectFile(item: File) {
        const { data, error } = await supabase.storage
            .from("files")
            .download(item.path);

        if (data) downloadBlob(data, item.name);
    }

    function openMoveFile(id: string, type: "file" | "folder") {
        activeItem.value = id;
        activeItemType.value = type;
        moveFolderDialogOpen.value = true;
    }

    onMounted(async () => {
        await getAllFolders();
        await getAllFiles();
        await getFolders();
        await getFiles();
    });

    async function getFiles() {
        files.value = allFiles.value?.filter(
            (file: File) => file.folder == currentFolderId.value
        ) as File[];
    }

    async function getFolders() {
        folders.value = allFolders.value?.filter(
            (folder: Folder) => folder.parent == currentFolderId.value
        ) as Folder[];

        // console.log(folders.value);
    }

    async function getAllFolders() {
        const { data, error } = await supabase
            .from("folders")
            .select("*")
            .eq("archived", false);
        if (error) console.error(error);
        else {
            allFolders.value = data;
        }
        if (allFolders.value) {
            foldersTree.value = [];
            foldersTree.value = getFoldersTree(
                allFolders.value,
                rootItem.value
            );
        }
    }

    async function getAllFiles() {
        const { data, error } = await supabase
            .from("files")
            .select("*")
            .eq("archived", false);
        if (error) console.error(error);
        else {
            allFiles.value = data;
        }
        filesLoading.value = false;
    }

    async function uploadFile(event: Event) {
        const target = event.target as HTMLInputElement;
        const fileList = target.files;

        if (!fileList || fileList.length === 0) return;

        const file = fileList[0];
        const fileName = file.name;
        const path = `${fileName}`;

        await supabase.storage
            .from("files")
            .upload(path, file, { upsert: true });

        const { error } = await supabase.from("files").insert([
            {
                name: fileName,
                folder: currentFolderId.value,
                profile: userProfileStore().profile?.id,
                path: path,
            },
        ]);

        if (error) console.error(error);
        else {
            await getAllFolders();
            await getAllFiles();
            await getFolders();
            await getFiles();
        }
    }

    async function createFolder(name: string) {
        await supabase
            .from("folders")
            .insert({ name: name, parent: currentFolderId.value });

        addFolderDialogOpen.value = false;

        await getAllFolders();
        await getAllFiles();
        await getFolders();
        await getFiles();
    }

    async function moveFile(newFolderId: string) {
        const field = activeItemType.value + "s";

        if (activeItemType.value === "folder" && allFolders.value) {
            const movedFolderIndex = allFolders.value.findIndex(
                (folder) => folder.id === activeItem.value
            );
            if (movedFolderIndex !== -1) {
                allFolders.value[movedFolderIndex].parent = newFolderId;
            }
        }

        await supabase
            .from(field)
            .update({
                [activeItemType.value === "file" ? "folder" : "parent"]:
                    newFolderId,
            })
            .eq("id", activeItem.value);

        await getAllFolders();
        await getAllFiles();
        await getFolders();
        await getFiles();
    }

    async function updateCurrentFolderPath() {
        let path = "/";
        let currentId = currentFolderId.value;

        breadcrumbs.value = []; // Reset breadcrumbs array here

        while (currentId) {
            const data: Folder | undefined = allFolders.value?.find(
                (folder: Folder) => folder.id === currentId
            );
            if (data) {
                breadcrumbs.value.unshift(data); // Just unshift data without the conditional statement
                path = `/${data.name}${path}`;
                currentId = data.parent ?? undefined;
            }
        }
        breadcrumbs.value.pop();
        currentFolderPath.value = path;
    }

    function downloadBlob(blob: Blob, name: string) {
        // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
        const blobUrl = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement("a");

        // Set link's href to point to the Blob URL
        link.href = blobUrl;
        link.download = name;

        // Append link to the body
        document.body.appendChild(link);

        // Dispatch click event on the link
        // This is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
            })
        );

        // Remove link from body
        document.body.removeChild(link);
    }

    function openAddFolderDialog() {
        addFolderDialogOpen.value = true;
    }

    function setParentForChildren(folder: Folder): void {
        if (folder.children) {
            for (const child of folder.children) {
                child.parent = folder.id;
                setParentForChildren(child);
            }
        }
    }

    function getFoldersTree(folders: Folder[], rootFolder: Folder): Folder[] {
        rootFolder.children = []; // Add this line to reset the root folder's children

        const copiedFolders: Folder[] = JSON.parse(JSON.stringify(folders));

        // Exclude the root folder from processing
        const nonRootFolders = copiedFolders.filter(
            (folder) => folder.id !== rootFolder.id
        );

        // Create a map to store folders by their ID
        const folderMap: { [key: string]: Folder } = {};

        // Add the rootFolder to the folderMap
        folderMap[rootFolder.id] = rootFolder;

        // Iterate over the non-root list of folders and add each folder to the map
        for (const folder of nonRootFolders) {
            // Ensure that all folders have a 'children' property set, even if it's an empty array
            if (!folder.children) {
                folder.children = [];
            }

            folderMap[folder.id] = folder;
        }

        // Iterate over the non-root list of folders again and build the tree structure
        for (const folder of nonRootFolders) {
            if (folder.parent === null) {
                // If the folder has no parent, set its parent to the rootFolder's id
                folder.parent = rootFolder.id;
            }

            const parentFolder = folderMap[folder.parent];
            if (parentFolder) {
                if (!parentFolder.children) {
                    parentFolder.children = [];
                }
                parentFolder.children.push(folder);
            }
        }

        // Set the root folder's children to the rootFolders array
        rootFolder.children = folderMap[rootFolder.id].children;

        // Set the parent field for all children of the root folder
        setParentForChildren(rootFolder);

        return [rootFolder];
    }

    async function archiveFile(id: string) {
        await supabase
            .from("files")
            .update({
                archived: true,
            })
            .eq("id", id);

        await getAllFolders();
        await getAllFiles();
        await getFolders();
        await getFiles();
    }

    async function archiveFolder(folder: Folder) {
        await supabase
            .from("folders")
            .update({
                archived: true,
            })
            .eq("id", folder.id);

        console.log(folder);

        // Implement recursive archive later
        // if (folder.children && folder.children.length) {
        //     await supabase
        //         .from("files")
        //         .update({
        //             archived: true,
        //         })
        //         .eq("folder", folder.id);

        //     await supabase
        //         .from("folders")
        //         .update({
        //             archived: true,
        //         })
        //         .eq("parent", folder.id);
        // }

        await getAllFolders();
        await getAllFiles();
        await getFolders();
        await getFiles();
    }
</script>
