import { v2 as cloudinary } from 'cloudinary';

const config = {
  cloud_name: "NAF-Texnika",
  api_key: "418585468175216",
  api_secret: "F6Lutsjf_jXQS_GW4UMIZeVJS28"
};

async function testConfig(name: string, key: string, secret: string) {
  console.log(`Testing Cloud: ${name}...`);
  cloudinary.config({
    cloud_name: name,
    api_key: key,
    api_secret: secret
  });
  
  try {
    const res = await cloudinary.api.ping();
    console.log(`✅ Success for ${name}:`, res);
    return true;
  } catch (err: any) {
    console.log(`❌ Fail for ${name}:`, err.message || err);
    return false;
  }
}

async function runTests() {
  // Test variations
  await testConfig("NAF-Texnika", "418585468175216", "F6Lutsjf_jXQS_GW4UMIZeVJS28");
  await testConfig("naf-texnika", "418585468175216", "F6Lutsjf_jXQS_GW4UMIZeVJS28");
  
  // Try to see if it's the quotes from env
  await testConfig("\"NAF-Texnika\"", "\"418585468175216\"", "\"F6Lutsjf_jXQS_GW4UMIZeVJS28\"");
  
  console.log("\n--- FINISHED ---");
}

runTests();
