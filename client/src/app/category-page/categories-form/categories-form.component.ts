import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {switchMap} from "rxjs/operators";
import {Observable, of, Subscription} from "rxjs";
import {MaterialService} from "../../shared/material.service";
import {Category, Message} from "../../shared/models";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit, OnDestroy {

  image: File;
  form: FormGroup;
  isNew: boolean = true;
  imagePreview: any;
  category: Category;
  @ViewChild('imageInput') imageInput: ElementRef;

  private aSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.form.disable();

    this.aSub = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false;
              return this.categoriesService.getById(params['id']);
            }
            return of(null);
          }
        )
      ).subscribe(
        (category: Category) => {
          if (category) {
            this.category = category;
            this.form.patchValue({
              name: category.name
            });
            this.imagePreview = category.imageSrc;
            MaterialService.updateTextInputs();
          }
          this.form.enable();
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  ngOnDestroy() {
    this.aSub.unsubscribe();
  }

  triggerClick() {
    this.imageInput.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file: File = event.target.files[0]
    this.image = file;

    console.log(this.image);

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    }

    reader.readAsDataURL(file);
  }


  deleteCategory() {
    const decision = window.confirm(`Are you sure you want to delete ${this.category.name}?`);

    if (decision) {
      this.categoriesService.deleteCategory(this.category._id)
        .subscribe(
          (response: Message) => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/categories'])
        )
    }
  }

  onSubmit() {
    this.form.disable();
    let obs$;

    if (this.isNew) {
      console.log(this.form.value);
      obs$ = this.categoriesService.createCategory(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesService.updateCategory(this.category._id, this.form.value.name, this.image);
    }

    this.aSub = obs$.subscribe(
      (category: Category) => {
        this.category = category;
        MaterialService.toast('Changes was saved');
        this.form.enable();
      },
      error => {
        this.form.enable();
        MaterialService.toast(error.error.message);
      }
    );
  }
}
