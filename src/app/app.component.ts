import { Todo } from './../models/todo.model';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:
  [RouterOutlet,
  CommonModule,
  ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  public mode = 'list';
  //any é todo tipo, usando [] definindo como array
  public todos: Todo[] = [];
  //public title: string = 'Minhas Tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
      this.form = this.fb.group({
        title:['', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required
        ])]
      });

  }

  ngOnInit():void{
    this.load();
  }

  Add(){
    //recuperando o valor do campo
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.Save();
    this.Clear();
  }

  Clear(){
    //limpando o form
    this.form.reset();
  }

  Remove(todo: Todo){
    const index = this.todos.indexOf(todo);

    if(index !== -1){
      //remove um item do array
      this.todos.splice(index, 1);
    }
    this.Save();
  }

  MarkAsDone(todo: Todo){
    todo.done = true;
    this.Save();
  }

  MarkAsUndone(todo: Todo){
    todo.done = false;
    this.Save();
  }

  Save(){
    //pegando o json em string
    const data = JSON.stringify(this.todos);
    //salvando no localstorege
    localStorage.setItem('todos', data);
    this.mode='list';
  }

  load(){
    //pegando os dados do localStorage
    const values: string | null = localStorage.getItem('todos');
    console.log('chegou aqui!')
    if(values !== null)
    //converte uma string no json
      this.todos = JSON.parse(values); 
    else
      this.todos = [];
  }

  changeMode(mode:string){
    this.mode = mode;
  }
}
