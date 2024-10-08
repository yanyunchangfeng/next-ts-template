export default {
  development: [
    {
      source: '/msService/:path*',
      destination: 'http://10.54.56.61:8080/msService/:path*'
    },
    {
      source: '/inter-api/:path*',
      destination: 'http://10.54.56.61:8080/inter-api/:path*'
    },
    {
      source: '/prober/:path*',
      destination: 'https://www.ttprober.com/:path*'
    },
    {
      source: '/greenDill/static/:path*',
      destination: 'http://10.54.56.61:8080/greenDill/static/:path*'
    },
    {
      source: '/dev/:path*',
      destination: 'http://10.54.56.61:8080/dev/:path*'
    }
  ],
  test: [
    {
      source: '/msService/:path*',
      destination: 'http://10.48.3.23:8080/msService/:path*'
    },
    {
      source: '/inter-api/:path*',
      destination: 'http://10.48.3.23:8080/inter-api/:path*'
    },
    {
      source: '/prober/:path*',
      destination: 'https://www.ttprober.com/:path*'
    },
    {
      source: '/greenDill/static/:path*',
      destination: 'http://10.48.3.23:8080/greenDill/static/:path*'
    },
    {
      source: '/test/:path*',
      destination: 'http://10.48.3.23:8080/test/:path*'
    }
  ]
};
