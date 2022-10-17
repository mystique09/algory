<script lang="ts">
    let isAuthenticated = false;
</script>

<div class="navbar bg-secondary max-w-7xl m-auto">
    <div class="flex-1">
        <a class="btn btn-ghost" href="/"><img src="/images/algory.svg" alt="Algory logo"></a>
    </div>
    
    <div class="flex-none gap-2">
        <div class="form-control">
            <input type="text" name="search" id="search" class="input input-bordered" placeholder="Search">
        </div>
        <div class="dropdown dropdown-end">
            <span tabindex="-1" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                    <img src="/images/algory.svg" alt="Avatar" />
                </div>
            </span>
            <ul tabindex="-1" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-secondary rounded-box w-52">
                {#if isAuthenticated}
                    <li>
                        <a href="/profile" class="justify-between">
                        Profile
                        <span class="badge">New</span>
                        </a>
                  </li>
                  <li><a href="/settings">Settings</a></li>
                  <li><a href="/logout">Logout</a></li>
                {:else}
                  <li><a href="/sign-up">Sign up</a></li>
                  <li><a href="/sihn-in" class="font-bold text-lg text-primary">Sign in</a></li>
                {/if}
            </ul>
        </div>
    </div>
</div>