import { Participant } from './types';

declare global {
  var __participants__: Participant[] | undefined;
}

export const participants: Participant[] = global.__participants__ ?? [
  {
    activity: 'Pencak Silat',
    nik: '3577010101010001',
    fullName: 'Budi Santoso',
    phone: '081234567890',
    provinsi: 'Jawa Timur',
    kabupaten: 'Kota Madiun',
    kecamatan: 'Manguharjo',
    kelurahan: 'Manguharjo',
    dusun: 'Dusun A',
    rtrw: '001/002',
    kodePos: '63121',
    detailAlamat: 'Dekat balai desa',
    createdAt: new Date().toISOString()
  }
];

global.__participants__ = participants;
