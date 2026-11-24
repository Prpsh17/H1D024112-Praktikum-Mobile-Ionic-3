import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonButton,
  IonItem,
  IonLabel,
  IonModal,
  IonInput,
  IonRow,
  IonCol,
  ModalController,
} from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.page.html',
  styleUrls: ['./mahasiswa.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonCard,
    IonButton,
    IonItem,
    IonLabel,
    IonModal,
    IonInput,
    IonRow,
    IonCol,
  ],
})
export class MahasiswaPage implements OnInit {
  dataMahasiswa: any = [];
  modal_tambah = false;
  modal_edit = false;
  id: any;
  nama: any;
  jurusan: any;

  constructor(
    public _apiService: ApiService,
    private modal: ModalController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getMahasiswa();
  }

  ionViewWillEnter() {
    this.getMahasiswa();
  }

  getMahasiswa() {
    this._apiService.tampil('tampilMahasiswa.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataMahasiswa = res;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  reset_model() {
    this.id = null;
    this.nama = '';
    this.jurusan = '';
    this.cdr.detectChanges();
  }

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
    this.cdr.detectChanges();
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilMahasiswa(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
    this.cdr.detectChanges();
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.modal_edit = false;
    this.reset_model();
    this.cdr.detectChanges();
  }

  tambahMahasiswa() {
    if (this.nama != '' && this.jurusan != '') {
      let data = {
        nama: this.nama,
        jurusan: this.jurusan,
      };
      this._apiService.tambah(data, 'tambahMahasiswa.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah mahasiswa');
          this.getMahasiswa();
          this.modal_tambah = false;
          this.modal.dismiss();
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.log('gagal tambah mahasiswa', err);
        }
      });
    } else {
      console.log('gagal tambah mahasiswa karena masih ada data yg kosong');
    }
  }

  hapusMahasiswa(id: any) {
    this._apiService.hapus(id, 'hapusMahasiswa.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getMahasiswa();
        console.log('berhasil hapus data');
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('gagal', error);
      }
    });
  }

  ambilMahasiswa(id: any) {
    this._apiService.lihat(id, 'lihatMahasiswa.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let mahasiswa = hasil;
        this.id = mahasiswa.id;
        this.nama = mahasiswa.nama;
        this.jurusan = mahasiswa.jurusan;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('gagal ambil data', error);
      }
    });
  }

  editMahasiswa() {
    let data = {
      id: this.id,
      nama: this.nama,
      jurusan: this.jurusan
    };
    this._apiService.edit(data, 'editMahasiswa.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getMahasiswa();
        console.log('berhasil edit Mahasiswa');
        this.modal_edit = false;
        this.modal.dismiss();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log('gagal edit Mahasiswa', err);
      }
    });
  }
}
