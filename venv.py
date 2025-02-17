import venv
import os
import sys

def create_venv(venv_dir):
    """Создает виртуальное окружение."""
    if not os.path.exists(venv_dir):
        print(f"Создание виртуального окружения в {venv_dir}...")
        builder = venv.EnvBuilder(with_pip=True)  # Включить pip
        builder.create(venv_dir)
        print("Виртуальное окружение создано.")
    else:
        print(f"Виртуальное окружение уже существует в {venv_dir}.")

def activate_venv(venv_dir):
    """Активирует виртуальное окружение (для текущей сессии)."""
    # На Windows
    if sys.platform == 'win32':
        activate_script = os.path.join(venv_dir, 'Scripts', 'activate')
        if os.path.exists(activate_script):
            print(f"Активация виртуального окружения (Windows): {venv_dir}")
            # Здесь нужно выполнить activate скрипт.  Этот скрипт меняет переменные окружения.
            #  К сожалению, этот процесс нельзя напрямую эмулировать в Python скрипте.
            #  Поэтому, вам нужно будет активировать окружение вручную в терминале после запуска этого скрипта.
            print("Пожалуйста, активируйте виртуальное окружение вручную в терминале:")
            print(f'  > {os.path.join(venv_dir, "Scripts", "activate")}')
        else:
            print(f"Не удалось найти скрипт активации для Windows: {activate_script}")
    # На Linux/macOS
    else:
        activate_script = os.path.join(venv_dir, 'bin', 'activate')
        if os.path.exists(activate_script):
            print(f"Активация виртуального окружения (Linux/macOS): {venv_dir}")
            # Аналогично Windows, нужно активировать вручную.
            print("Пожалуйста, активируйте виртуальное окружение вручную в терминале:")
            print(f'  > source {activate_script}')
        else:
            print(f"Не удалось найти скрипт активации для Linux/macOS: {activate_script}")

if __name__ == "__main__":
    venv_dir = ".venv"  # Имя директории для виртуального окружения
    create_venv(venv_dir)
    activate_venv(venv_dir)
    print("После активации, установите зависимости (см. файл requirements.txt)")
    print("Запустите скрипт командой: python venv.py")