<script>
  import { socialLinks } from "@lib/config/site-config"

</script>

<footer class="footer p-10 bg-base-300 text-base-content mt-10">
  <div>
    <span class="footer-title">About</span> 
    <a class="link link-hover">Funding</a> 
    <a class="link link-hover">Careers</a> 
    <a class="link link-hover">Marketing</a> 
  </div> 
  <div>
    <span class="footer-title">Resources</span> 
    <a class="link link-hover">Whitepapers</a> 
    <a class="link link-hover" href={socialLinks.find(x => x.title === 'GitHub')?.path}>Github</a> 
    <a class="link link-hover" href={socialLinks.find(x => x.title === 'Twitter')?.path}>Twitter</a> 
  </div> 
  <div>
    <span class="footer-title">Products</span> 
    <a class="link link-hover">Stablecoins</a>
    <a class="link link-hover">Market Making</a> 
    <a class="link link-hover">Spot Trading</a> 
    <a class="link link-hover">Perpectual Contract Trading</a>
    <a class="link link-hover">Futures Trading</a>
    <a class="link link-hover">Payment</a>
    <a class="link link-hover">Faucet</a> 
    <a class="link link-hover">Abdexscan</a> 
  </div> 
  <div>
    <span class="footer-title">Social</span> 
    <div class="grid grid-flow-col gap-4">
      <a href={socialLinks.find(x => x.title === 'Twitter')?.path}>
        <span class="icon-[mdi--twitter] w-7 h-7" />
      </a>
      <a href={socialLinks.find(x => x.title === 'GitHub')?.path}>
        <span class="icon-[mdi--github] w-7 h-7" />
      </a>
    </div>
  </div>
</footer>
