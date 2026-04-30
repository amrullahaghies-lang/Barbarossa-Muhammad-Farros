export type Wilayah = {
  provinsi: string;
  kabupaten: {
    nama: string;
    kecamatan: {
      nama: string;
      kelurahan: string[];
    }[];
  }[];
};

export const wilayahData: Wilayah[] = [
  {
    provinsi: 'Jawa Timur',
    kabupaten: [
      {
        nama: 'Kota Madiun',
        kecamatan: [
          { nama: 'Manguharjo', kelurahan: ['Manguharjo', 'Nambangan Lor'] },
          { nama: 'Kartoharjo', kelurahan: ['Kanigoro', 'Klegen'] }
        ]
      },
      {
        nama: 'Kabupaten Madiun',
        kecamatan: [
          { nama: 'Dolopo', kelurahan: ['Candimulyo', 'Doho'] },
          { nama: 'Mejayan', kelurahan: ['Krajan', 'Bangunsari'] }
        ]
      }
    ]
  },
  {
    provinsi: 'Jawa Tengah',
    kabupaten: [
      {
        nama: 'Kota Surakarta',
        kecamatan: [
          { nama: 'Banjarsari', kelurahan: ['Kadipiro', 'Nusukan'] },
          { nama: 'Laweyan', kelurahan: ['Pajang', 'Sondakan'] }
        ]
      }
    ]
  }
];
